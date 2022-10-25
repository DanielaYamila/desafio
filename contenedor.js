const fs = require('fs');
const { userInfo } = require('os');

const pathToFile = "./products.json";

class Contenedor {
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
        if (fs.existsSync(pathToFile)) {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                let newProducts = products.filter((product) => product.id != id);
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify(newProducts, null, 2)
                );
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



module.exports = Contenedor;