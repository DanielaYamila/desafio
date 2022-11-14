const socket = io();
const productsRealTime = document.getElementById('productsRealTime');

socket.on('savedProducts', data => {
    const productsDiv = document.getElementById('products');
    let products = '';
    data.forEach(pdt => {
        products += `<td>${pdt.title}</td>
                    <td>$${pdt.price}</td>`
    });
    productsDiv.innerHTML = products;
})