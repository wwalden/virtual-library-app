const res = require('express/lib/response');
const multer = require('multer');
const path = require("path");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      //const imgPath = path.join(__dirname, '../images/');
      //console.log(imgPath)
      callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = 'profPicUser';
        const extension = MIME_TYPES[file.mimetype];
        const fullName = name + Date.now() + '.' + extension
        callback(null, fullName);
    }
});


module.exports = multer({storage: storage}).single('image');