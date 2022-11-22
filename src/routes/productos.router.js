import { Router } from 'express';
import Contenedor from '../containers/contenedor.js';
import uploader from '../service/upload.js'

const contenedor = new Contenedor();
const router = Router();

router.get('/productos', async (request, response) => {
    let products = await contenedor.readProducts()
    if (products.products !=0) {
        response.render('products', {
            products
        })
    }
})

router.get('/', async (request, response) => {
    response.render('chat');
})

router.post('/', uploader.single('image'), async (request, response) => {
    console.log(request.file);
    const image = request.protocol+"://"+request.hostname+':8080/images/'+request.file.filename;
    let product = request.body
    product.image = image;
    const result = await contenedor.createProduct(product);
    response.send({status:"success",message:"Producto añadido."});
})

export default router;