import express from 'express';
import Contenedor from "../contenedor.js";

const app = express();
const server = app.listen(8080, () => console.log('Hi'))
const contenedor = new Contenedor();

app.get('/', (rq, rs) => {
    rs.send('Hola')
})

app.get('/productos', (rq, rs) => {
    contenedor.readProducts().then((response) => {
        rs.send(response);
    })
})

app.get('/productos/:id', (rq, rs) => {
    let id = rq.params.id;
    contenedor.getById(id).then((response) => {
        rs.send(response);
    });
})