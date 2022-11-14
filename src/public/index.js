const form = document.getElementById('productsForm');
let titleInput = document.getElementById('title1');
let priceInput = document.getElementById('price1');
let img = document.getElementById('image1');

form.addEventListener('submit', e=>{
    e.preventDefault();
    let formData = new FormData(form);
    if(form.price.value && form.title.value){
        socket.emit('add', {title: form.title.value, price: form.price.value})
        fetch('/productos',{
            method: 'POST',
            body: formData
        }).then(result => result.json).then(json => console.log(json))
        titleInput.value = '';
        priceInput.value = '';
        img.value = '';
    }
})