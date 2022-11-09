import express from 'express';
import handlebars from 'express-handlebars';
import router from './routes/productos.router.js';
import __dirname from './utils.js';

const app = express();

app.listen(8080, () => console.log('Listen...'));

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use('/', router);
app.use('/productos', router);