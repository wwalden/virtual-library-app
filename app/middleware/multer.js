const res = require('express/lib/response');
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      const path = 'images';
      callback(null, path);
    },
    filename: (req, file, callback) => {
        const name = 'profPicUser';
        const extension = MIME_TYPES[file.mimetype];
        const fullName = name + Date.now() + '.' + extension
        callback(null, fullName);
    }
});


module.exports = multer({storage: storage}).single('image');