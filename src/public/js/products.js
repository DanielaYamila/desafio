const socket = io();
const productsDiv = document.getElementById('products');
const products = '';

socket.on('savedProducts', data => {
    data.forEach(pdt => {
        products += `<tr><td>${pdt.name}</td><td>$${pdt.price}</td></tr>`
        productsDiv.innerHTML = products;
    });
})
