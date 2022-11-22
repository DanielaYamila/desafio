import fs from 'fs';
import __dirname from '../utils.js';

const pathToFile = __dirname+'/files/messages.json';

class ContenedorMsg {
    saveMsg = async (msg) => {
        if (!msg) {
            return {
                status: "Error",
                message: "Messga is required"
            }
        }
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, 'utf-8');
                let messages = JSON.parse(data);
                messages.push(msg);
                await fs.promises.writeFile(pathToFile, JSON.stringify(messages, null, 2));
                return {
                    status: "Sucess",
                    message: "Add message"
                }
            } else {
                await fs.promises.writeFile(pathToFile, JSON.stringify([msg], null, 2));
            }
        } catch (error) {
            return {
                status: "Error",
                messages: error.message
            }
        }
    }
    getAllMsg = async () => {
        try {
            if (fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let messages = JSON.parse(data);
                return {
                    status: "Sucess",
                    messages: messages
                }
            } else {
                return {
                    status: "Error",
                    message: "Route not found",
                    messages: []
                }
            } 
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
}

export default ContenedorMsg;