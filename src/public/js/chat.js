const socket = io();
let emailUser; 
const chat = document.getElementById('chat');
const userMail = document.getElementById('userMail');
const saludo = document.getElementById('saludo');
const sendMessage = document.getElementById('sendMessage');
const fecha = () => { 
    const fh = new Date();
    const day = fh.getDate();
    const month = fh.getMonth();
    const year = fh.getFullYear();
    const hours = fh.getHours();
    const minutes = fh.getMinutes();
    const seconds = fh.getSeconds();
    return `[${day}/${month}/${year} ${hours}:${minutes}:${seconds}]`
}

userMail.addEventListener('keyup', e => {
    if (e.key === "Enter" && userMail.value.trim().length > 0) {
        socket.emit('authenticated',{ email: userMail.value.trim()})
        emailUser = userMail.value.trim()
        chat.disabled = false;
        userMail.disabled = true;
        userMail.value = "Usuario registrado";
        saludo.innerHTML = `Bienvenido ${emailUser}`;
    }
})

sendMessage.addEventListener('click', e => {
    if (chat.value.trim().length > 0) {
        socket.emit('message',{emailUser, date: fecha(), message:chat.value.trim()})
        chat.value = '';
    }
})

socket.on('logs', data => {
    const chatPanel = document.getElementById('chatPanel');
    let message = '';
    data.forEach(msg => {
        message += `<p>${msg.emailUser} ${msg.date} : ${msg.message}</p>`
    })
    chatPanel.innerHTML = message;
})