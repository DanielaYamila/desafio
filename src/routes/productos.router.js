import { Router } from 'express';
import Contenedor from '../contenedor.js';
import uploader from '../service/upload.js'

const contenedor = new Contenedor();
const router = Router();

router.get('/productos', async (request, response) => {
    let products = await contenedor.readProducts()
    if (products.products !=0) {
        response.render('home.handlebars', {
            products
        })
    } else {
        response.render('home.handlebars', {
            products: {
                mensaje: "No hay productos agregados"
            }
        })
    }
})

router.post('/', uploader.single('image'), async (request, response) => {
    console.log(request.file);
    const image = request.protocol+"://"+request.hostname+':8080/images/'+request.file.filename;
    let product = request.body
    product.image = image;
    const result = await contenedor.createProduct(product);
    response.send({status:"success",message:"Producto añadido."});
})

// router.get('/:id', async (request, response) => {
//     const id = request.params.id
//     let result = await contenedor.getById(id)
//     response.send(result)
// })

// router.put('/:id', async (request, response) => {
//     const id = request.params.id
//     const productBody = request.body
//     let result = await contenedor.updateItem(productBody, id)
//     response.send(result)
// })

// router.delete('/:id', async (request, response) => {
//     const id = request.params.id
//     let result = await contenedor.deleteById(id)
//     response.send(result)
// })

export default router;