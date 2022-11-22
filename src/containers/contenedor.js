import fs from 'fs';
import __dirname from '../utils.js';

const pathToFile = __dirname+'/files/products.json'

export default class Contenedor {
    createProduct = async (product) => {
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile,'utf-8');
            let products = JSON.parse(data);
            let id = products.length + 1;
            product.id = id;
            if (products.length===0){
                product.id = 1;
                products.push(product);
                await fs.promises.writeFile(pathToFile,JSON.stringify(products,null,2));
                return {status:"success",message:"Agrego un producto."}
            }
            products.push(product);
            await fs.promises.writeFile(pathToFile,JSON.stringify(products,null,2));
            return {
                status:"success",
                message:"Agrego un producto."
            }
        } else{
            await fs.promises.writeFile(pathToFile,JSON.stringify([product],null,2));
            return {status:"success",message: "Agrego un producto."}
        }
    }
    updateItem = async (object, id) => {
        if (!id) {
            return {
                status: "Error",
                message: "Ese ID no existe"
            }
        }
        let products = await this.readProducts()
        try {
            let arrayProducts = products.products.map(product => {
                if (product.id == id) {
                    return {
                        name: object.name ? object.name : product.name,
                        number: object.number ? object.number : product.number,
                        image: object.image ? object.image : product.image,
                        id: product.id
                    }
                } else {
                    return product;
                }
            })
            let productUpdate = arrayProducts.find(product => product.id == id)
            if (productUpdate) {
                await fs.promises.writeFile(pathToFile, JSON.stringify(arrayProducts, null, 2))
                return {
                    status: "success",
                    message: "successfully upgraded product",
                    productNew: productUpdate
                }
            } else {
                return {
                    status: "error",
                    message: "Producto no encontrado"
                }
            }
        } catch {
            return products;
        }
    }
    readProducts = async () => {
        if (fs.existsSync(pathToFile)) {
            try {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                return {
                    status: "Exitoso",
                    products: products
                };
            } catch (error){
                return {
                    status: "Error",
                    message: "Route not found"
                };
            }
        } else {
            return {
                status: "Exitoso",
                message: error.message
            }
        }
    };
    getById = async(id) => {
        if (!id) {
            return {
                status: "Error",
                message: "Ese ID no existe"
            }
        }
        if(fs.existsSync(pathToFile)) {
            try {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let product = products.find((product) => product.id == id);
                return {
                    status: "Exitoso",
                    payload: product,
                };
            } catch (error){
                return {
                    status: "Error",
                    error:error
                };
            }
        }
    };
    deleteById = async(id) => {
        if (fs.existsSync(pathToFile)) {
            try {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                if (products.find(producto => producto.id == id)) {
                    let newProducts = products.filter((product) => product.id != id);
                    await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts, null, 2));
                    return {
                        status: "Exitoso",
                        message: "Producto eliminado."
                    };
                } else {
                    return {
                        status: "Error",
                        message: "Producto no encontrado."
                    };
                };
            } catch (error) {
                return {
                    status: "Error",
                    error: error.message
                }
            } 
        }
    }
    
};