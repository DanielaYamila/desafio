import express from 'express';
import {Server} from 'socket.io';
import handlebars from 'express-handlebars';
import Contenedor from './containers/contenedor.js';
import contenedorMsg from './containers/contenedormsg.js';
import router from './routes/productos.router.js';
import __dirname from './utils.js';

const app = express();
const server = app.listen(8080, () => console.log('Listen...'));
const contenedor = new Contenedor();
const containerMsg = new contenedorMsg();

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use('/', router);
app.use('/productos', router);
app.use('/chat', router);

const io = new Server(server); 

const products = [];
const messages = [];
const read = async () => {
    let data = await contenedor.readProducts();
    data.products.forEach(pdt => {
        products.push(pdt);
    });
}
const readMsg = async () => {
    let data = await containerMsg.getAllMsg();
    data.messages.forEach(msg => {
        messages.push(msg);
    });
}
read();
readMsg();

io.on('conection', socket => {
    socket.emit('savedProducts', products);
    socket.on('add', data => {
        products.push(data);
        io.emit('savedProducts', products);
    })
    socket.emit('logs', messages);
    socket.on('message', data => {
        if (data.emailUser != undefined) {
            messages.push(data);
            containerMsg.saveMsg(data);
            io.emit('logs', messages);
        }
    })
    socket.on('authenticated', data => {
        console.log(`${data.email} se valido.`);
    })
})