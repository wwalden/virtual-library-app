const cloudinary = require('cloudinary').v2;


const cloudController = {
  async uploadPicture(req,res) {
    //console.log(res.locals.filename)
    //await cloudinary.uploader.upload("app/images/profpicUsertest1652988059699.jpg", function(error, result) {console.log(result, error)});
    //res.send('ok')
  }
};


module.exports = cloudController;