import fs from 'fs';
import __dirname from '../utils.js';

const pathToFile = __dirname+"/files/products.json";
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

export default class Contenedor {
    createProduct = async (product) => {
        if (!product.title || !product.price || !product.description || !product.code || !product.stock) {
            return {
                status: "Error",
                message: "Missing required fields"
            };
        }
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let id = products.length + 1;
                product.id = id;
                product.timestamp = fecha();
                products.push(product);
                await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
                return {
                    status: "Sucess.",
                    message: "Product added."
                };
            } else {
                product.id = 1;
                product.timestamp = fecha();
                await fs.promises.writeFile(pathToFile, JSON.stringify([product], null, 2));
                return {
                    status: "Sucess.",
                    message: "Product added."
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
                    status: "Sucess",
                    products: products,
                };
            } else {
                return {
                    status: "Error",
                    message: "Route not found"
                };
            }
        } catch (error){
            return {
                status: "Error",
                message: error.message,
            };
        }
    };
    getById = async(id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required.",
            };
        }
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, "utf-8");
            let products = JSON.parse(data);
            let product = products.find((product) => product.id == id);
            if(product) {
                return {
                    status: "Sucess",
                    product: product,
                };
            } else {
                return {
                    status: "Error",
                    message: "Product not found",
                };
            }
        } else {
            return {
                status: "Error",
                message: "Route not found"
            }
        };
    };
    deleteById = async(id) => {
        if (!id) {
            return {
                status: "Error",
                message: "ID is required",
            };
        }
        if (fs.existsSync(pathToFile)) {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                if (products.find(product => product.id === id)) {
                    let newProducts = products.filter((product) => product.id != id);
                    await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts, null, 2));
                    return {
                        status: "Sucess",
                        message: "Product deleted",
                    };
                } else {
                    return {
                        status: "Error",
                        message: "Producto no encontrado"
                    };
                };

            }
        } else {
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
                    message: "File not found"
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
        let products = await this.readProducts();
        try {
            let arrayProducts = products.products.map(product => {
                if (product.id == id) {
                    return {
                        title: object.title ? object.title : product.title,
                        description: object.description ? object.description : product.description,
                        code: object.code ? object.code : product.code,
                        price: object.price ? object.price : product.price,
                        stock: object.stock ? object.stock : product.stock,
                        thumbnail: object.thumbnail ? object.thumbnail : product.thumbnail,
                        id: product.id,
                        timestamp: fecha()
                    }
                } else {
                    return product
                }
            })
            let productUpdate = arrayProducts.find(product => product.id === id)
            if (productUpdate) {
                await fs.promises.writeFile(pathToFile, JSON.stringify(arrayProducts, null, 2));
                return {
                    status: "Sucess",
                    message: "Sucessfully upgraded product",
                    productNew: productUpdate
                }
            } else {
                return {
                    status: "Error",
                    message: "Product not found"
                }
            }
        } catch {
            return products
        }
    }
};