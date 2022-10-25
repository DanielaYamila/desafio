const Contenedor = require("./contenedor");
const contenedor = new Contenedor();

let product = {
    title: "Pepitos",
    price: 250,
    description: "Galletitas de chocolate"
}

//Función muestra el o los producto/s agregados 
//contenedor.createProduct(product).then((response) => {
//    console.log(response);
//})

//Función muestra todos los productos
contenedor.readProducts().then((response) => {
    console.log(response);
})

//Función muestra el producto por Id
//contenedor.getById(1).then((response) => {
//    console.log(response);
//})

//Función elimina el producto por Id
//contenedor.deleteById(4).then((response) => {
//    console.log(response);
//})

//Función elimina todos los productos
//contenedor.deleteAll().then((response) => {
//    console.log(response);
//})