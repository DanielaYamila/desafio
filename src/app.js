import express from 'express';
import router from './routes/productos.router.js';
import __dirname from './utils.js';

const app = express();

app.listen(8080, () => console.log('Listen...'))

app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use('/api/productos', router)