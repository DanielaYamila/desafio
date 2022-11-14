let user; 
const socket = io();
const chat = document.getElementById('chat');
const userMail = document.getElementById('userMail');
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
    if (e.key === "Enter" && userMail.value.trim().length>0) {
        socket.emit('authenticated',{email:userMail.value.trim()})
        mailUser = userMail.value.trim()
        chat.disable = false;
    }
})

sendMessage.addEventListener('click', e => {
    if (chat.value.trim().length>0) {
        socket.emit('message',{mailUser, message:chat.value.trim()})
        chat.value = "";
    }
})

socket.on('logs', data => {
    const chatPanel = document.getElementById('chatPanel');
    let message = "";
    data.forEach(msg => {
        message += `${msg.mailUser} ${fecha()} : ${msg.message}`
    })
    chatPanel.innerHTML = message;
})