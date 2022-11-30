import { Router } from "express";
import Container from "../container/containerProducts.js";
import uploader from "../services/upload.js";

const router = Router();
const contenedor = new Container();
let admin = true;

router.get('/', async (rq, rs) => {
    const result = await contenedor.readProducts();
    rs.send(result);
})
router.get('/:pid', async (rq, rs) => {
    const id = parseInt(rq.params.pid);
    let result = await contenedor.getById(id);
    rs.send(result);
})
router.post('/', uploader.single('image'), async (rq, rs) => {
    if (admin) {
        let thumbnail = "";
        if (rq.file) {
            thumbnail = rq.protocol + "://" + rq.hostname + ":8080/images/" + rq.file.filename
        }
        let product = rq.body;
        if ((product.name && product.price) != '') {
            product.thumbnail = thumbnail;
            const result = await contenedor.createProduct(product);
            rs.send({product: result});
        }
    }
})
router.put('/:pid', async (rq, rs) => {
    if (admin) {
        const id = parseInt(rq.params.pid);
        const productNew = rq.body;
        let result = await contenedor.updateItem(productNew, id);
        rs.send(result)
    }
})
router.delete('/:pid', async (rq, rs) => {
    if (admin) {
        const id = parseInt(rq.params.pid);
        let result = await contenedor.deleteById(id);
        rs.send(result)
    }
})

export default router;