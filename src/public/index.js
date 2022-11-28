const form = document.getElementById('productsForm');
let nameInput = document.getElementById('name1');
let priceInput = document.getElementById('price1');
let imageInput = document.getElementById('image1');

form.addEventListener('submit', e=>{
    e.preventDefault();
    let formData = new FormData(form);
    if(form.name.value && form.price.value){
        socket.emit('add', {name: form.name.value, price: form.price.value})
        fetch('/productos',{
            method: 'POST',
            body: formData,
        }).then(result => result.json).then(json => console.log(json))
        nameInput.value = '';
        priceInput.value = '';
        imageInput.value = '';
    }
})