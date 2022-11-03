import fs from 'fs';
import __dirname from './utils.js';

const pathToFile = __dirname+'/files/products.json'

class Contenedor{
    createProduct = async (product) => {
        if (!product.title || !product.price || !product.description) {
            return {
                status: "Error",
                message: "Faltan campos obligatorios"
            };
        }
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let id = products.length + 1;
                product.id = id;
                products.push(product);
                await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
                return {
                    status: "Exitoso",
                    message: "Se ha creado el producto"
                };
            } else {
                product.id = 1;
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify([product], null, 2)
                );
                return {
                    status: "Exitoso",
                    message: "Se ha creado el creado"
                };
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        };
    }
    readProducts = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                return {
                    status: "Exitoso",
                    products: products,
                };
            } else {
                return {
                    status: "Error",
                    message: "No ha encontrado los productos."
                };
            }
        } catch (error){
            return {
                status: "Error",
                message: error.message,
            };
        }
    };
    updateItem = async (object, id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required"
            }
        }
        let products = await this.readProducts()
        try {
            let arrayProducts = products.products.map(product => {
                if (product.id == id) {
                    return {
                        name: object.name ? object.name : product.name,
                        description: object.description ? object.description : product.description,
                        image: object.image ? object.image : product.image,
                        price: object.price ? object.price : product.price,
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
    deleteObj = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                let newProd = [];
                await fs.promises.writeFile(pathToFile, JSON.stringify(newProd))
                return {
                    status: "success",
                    Message: "Borrar todos los productos"
                }
            } else {
                return {
                    status: "Error",
                    Message: "Archivo no encontrado"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            };
        };
    };
    getById = async(id) => {
        if (!id) {
            return {
                status: "Error",
                message: null,
            };
        }
        if(fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, "utf-8");
            let products = JSON.parse(data);
            let product = products.find((product) => product.id == id);
            if(product) {
                return {
                    status: "Exitoso",
                    product: product,
                };
            } else {
                return {
                    status: "Error",
                    message: "Producto no existente",
                };
            }
        } else {
            return {
                status: "Error",
                message: "Producto no existente"
            }
        };
    };
    deleteById = async(id) => {
        if (!id) {
            return {
                status: "Error",
                message: null,
            };
        }
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                if (productos.find(producto => producto.id == id)) {
                    let newProducts = products.filter((product) => product.id != id);
                    await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts, null, 2));
                    return {
                        status: "Exitoso",
                         message: "El producto se ha eliminado",
                    };
                } else {
                    return {
                        status: "Error",
                        message: "Producto no encontrado"
                    };
                };
            } else {
                return {
                    status: "Error",
                    Message: "Ruta no encontrada"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    } 
    deleteAll = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                fs.unlinkSync(pathToFile)
            } else {
                return {
                    status: "Error",
                    message: "No ha encontrado los productos."
                };
            }
        } catch (error){
            return {
                status: "Error",
                message: error.message,
            };
        }
    };
};

export default Contenedor;