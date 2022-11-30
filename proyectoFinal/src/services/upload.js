import multer from 'multer';
import __dirName from '../utils.js';

const storage = multer.diskStorage ({
    destination: function (rq, file, cb) {
        cb (null, __dirName+'/public/images');
    },
    filename: function (rq, file, cb) {
        cb (null, Date.now() + file.originalname)
    }
})

const uploader = multer({storage});

export default uploader;