import express from 'express';
import handlebars from 'express-handlebars';
import __dirName from './utils.js'
import routeProducts from './routes/views.routes.products.js';
import routeCart from './routes/views.router.cart.js';

const app = express();
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log("Listen.."))

app.use(express.static(__dirName+'/public'));
app.use(express.json());

app.engine('handlebars', handlebars.engine());

app.set('views', __dirName+'/views');
app.set('view engine', 'hadlebars');

app.use('/api/products', routeProducts);
app.use('/api/carts', routeCart);