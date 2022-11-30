import fs from 'fs';
import __dirname from '../utils.js';

export default class ContenedorCart {
    constructor() {
        this.path = `${__dirname}/files/cart.json`
        this.init()
    }
    init = async() => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
    }
    readFile = async() => {
        let data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }
    getCarts = () => {
        return this.readFile();
    }
    exists = async(id) => {
        let carts = await this.getCarts();
        return carts.some(cart => cart.id === id);
    }
    existsProduct = async (cid, pid) => {
        let carts = this.getCarts();
        let cartExist = await this.exists(cid);
        if (cartExist) {
            let cart = carts.find(cart => cart.id === cid);
            let productsCard = await cart.cart.map(prod => prod);
            return productsCard.some(prod => prod.id == pid);
        } else {
            return {
                status: "Error",
                message:  "Cart not found"
            }
        }
    }
    createCart = async (fh) => {
        const carts = await this.readFile();
        const newCart = {
            id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
            timestamp: fh,
            cart: []
        }
        carts.push(newCart); 
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        return newCart;
    }
    getById = async (id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        const carts = await this.readFile();
        const cart = carts.find((cart) => cart.id === id);
        if (cart) {
            return {
                status: "Sucess",
                cart: cart
            }
        } else {
            return {
                status: "Error",
                cart: "Cart not found"
            }
        }
    }
    deleteById = async (id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        const carts = await this.readFile();
        if (carts.find(cart => cart.id === id)) {
            let newCarts = carts.filter((cart) => cart.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, '\t'));
            return {
                status: "Sucess",
                message: "Cart deleted"
            }
        } else {
            return {
                status: "Error",
                cart: "Cart not found"
            }
        }
    }
    addProduct = async (id, product) => {
        if (!id || !product) {
            return {
                status: "Error",
                message: "Param is required"
            }
        }
        let carts = await this.readFile();
        let newCart;
        let cart = carts.find(cart => cart.id === id);
        let products = cart.cart.map(prod => prod);
        let productRepeat = products.find(prod => prod.id === product.id);
        if (productRepeat) {
            let arrayProducts = [];
            let newProd = {
                id: product.id,
                quantity: product.quantity + productRepeat.quantity
            }
            let newCarts = carts.map(cart => {
                if (cart.id === id) {
                    products.map(prod => {
                        if (prod.id === product.id) {
                            arrayProducts.push(newProd);
                        } else {
                            arrayProducts.push(prod);
                        }
                    })
                    return {id: cart.id, timestamp: cart.timestamp, cart: arrayProducts};
                } else {
                    return cart;
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, '\t'));
            return {status: "Sucess", message: "Edited quantity", payload: newProd};
        } else {
            let addedProduct = carts.map(cart => {
                if (cart.id === id) {
                    newCart = {
                        id: product.id,
                        quantity: product.quantity
                    }
                    return {
                        id: cart.id,
                        timestamp: cart.timestamp,
                        cart: [...cart.cart, newCart]
                    }
                } else {
                    return cart;
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(addedProduct, null, '\t'));
            return {
                status: "Sucess",
                payload: newCart
            }
        }
    }
    deleteProduct = async (cid, pid) => {
        if (!cid || !pid) {
            return {
                status: "Error",
                message: "Param is required"
            }
        }
        let existsProduct = await this.existsProduct(cid, pid);
        if (existsProduct) {
            let carts = await this.readFile()
            let products = []
            let newCart = carts.map(cart => {
                if (cart.id === cid) {
                    cart.cart.map(product => {
                        if (product.id != pid) {
                            products.push(product)
                        }
                    })
                    return {
                        id: cart.id,
                        timestamp: cart.timestamp,
                        cart: products
                    }
                } else {
                    return cart
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, '\t'))
            return {status: "Sucess", message: "Deleted product"}
        } else {
            return {
                status: "Error",
                message: "Product not found"
            }
        }
    }
    saveCart = async (cart) => {
        if (!cart) {
            return {
                status: "Error",
                message: "Param required"
            }
        }
        const carts = await this.readFile()
        if (carts.length === 0) cart.id = 1
        else cart.id = carts[carts.length - 1].id + 1
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        return {
            status: "Sucess",
            message: "Cart added successfully",
        }
    }
}