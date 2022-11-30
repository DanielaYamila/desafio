import { Router } from "express";
import ContenedorCart from "../container/containerCart.js"

const router = Router();
const contenedor = new ContenedorCart(); 

const fecha = () => {
    const fh = new Date();
    const day = fh.getDate();
    const month = fh.getMonth();
    const year = fh.getFullYear();
    const hours = fh.getHours();
    const minutes = fh.getMinutes();
    const seconds = fh.getSeconds();
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
}

router.post('/', async (rq, rs) => {
    const newCart = await contenedor.createCart(fecha());
    rs.send({status: "Sucess", payload: newCart})
})
router.post('/', async (rq, rs) => {
    const {products} = rq.body;
    if (!products) return rs.status(400).send({status:"Error", error: "Incompleted value"}) 
    const productInsert = {
        products: products,
        timestamp: fecha()
    }
    const result = await contenedor.saveCart(productInsert);
    rs.send(result)
})
router.delete('/:cid', async (rq, rs) => {
    const id = parseInt(rq.params.cid);
    const cart = await contenedor.deleteById(id);
    rs.send(cart)
})
router.get('/:cid/products', async (rq, rs) => {
    const id = parseInt(rq.params.cid);
    let cart = await contenedor.getById(id);
    let products = [];
    if (cart.status != "error") {
        cart.cart.cart.map(product => products.push(product));
        rs.send({payload: products})
    }
})
router.post('/:cid/products', async (rq, rs) => {
    const cid = parseInt(rq.params.cid);
    const existsCart = await contenedor.exists(cid);
    if (existsCart) {
        const product = rq.body;
        let productInsert = await contenedor.addProduct(cid, product)
        rs.send(productInsert)
    }
})
router.delete('/:cid/products/:pid', async (rq, rs) => {
    const cartId = parseInt(rq.params.cid);
    const productId = parseInt(rq.params.pid);
    const existsCart = await contenedor.exists(cartId);
    if (existsCart) {
        const result = await contenedor.deleteProduct(cartId, productId)
        rs.send(result)
    }
})

export default router;