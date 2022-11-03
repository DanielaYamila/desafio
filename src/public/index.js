const form = document.getElementById('productsForm')

form.addEventListener('submit', e=>{
    e.preventDefault();
    let formData = new FormData(form);
    if(form.title.value && form.description.value && form.price.value){
        fetch('/api/productos',{
            method: 'POST',
            body: formData,
        }).then(result => result.json).then(result => console.log(result))
    }else{
        console.log("Faltan completar campos")
    }
})