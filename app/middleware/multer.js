const res = require('express/lib/response');
const multer = require('multer');
const userID = "test"

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './app/images');
    },
    filename: (req, file, callback) => {
        const name = 'profPicUser' + userID;
        const extension = MIME_TYPES[file.mimetype];
        const fullName = name + Date.now() + '.' + extension
        //res.locals.filename = fullName;
        callback(null, fullName);
    }
});

module.exports = multer({storage: storage}).single('image');