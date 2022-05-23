const cloudinary = require('cloudinary').v2;


const cloudController = {
  async uploadPicture(req, res) {
    //console.log(res.locals.filename)
    //console.log(file.filename)
    //await cloudinary.uploader.upload("app/images/profPicUsertest1653035476546.jpg",
    //function (req, res) {
      //return res.send({message: "ok"})});
      //console.log(req.file.filename)
      await cloudinary.uploader.upload(`app/images/${req.file.filename}`,
        function(error, result) {
          console.log(result, error);
        })
      return res.send({
        success: true, url: 'mediaurl'
      })
    //res.status(200).json({ message: 'image is uploaded'});
  }
};


module.exports = cloudController;