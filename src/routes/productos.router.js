import { Router } from 'express';
import Contenedor from '../containers/contenedor.js';
import uploader from '../service/upload.js'

const contenedor = new Contenedor();
const router = Router();

router.get('/productos', async (request, response) => {
    let products = await contenedor.readProducts()
    if (products.products.length !=0) {
        response.render('products', {
            products
        })
    }
})

router.get('/', async (request, response) => {
    response.render('chat');
})

router.post('/', uploader.single('image'), async (request, response) => {
    let image = "";
    if (request.file) {
    const image = request.protocol+"://"+request.hostname+':8080/images/'+request.file.filename;
    }
    let product = request.body
    if ((product.name && product.price) != '') {
        product.image = image;
        const result = await contenedor.createProduct(product);
        response.send({product: result});
    }
})

export default router;