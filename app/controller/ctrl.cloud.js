const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const userDataMapper = require("../model/dataMapper.user");

const cloudController = {
  async uploadPicture(req, res) {
    try {
      const userId = res.locals.user
      if (userId != req.params.id) {
        return res.status(403).json({ error: 'forbidden' });
      }
      const fileName = req.file.filename
      await cloudinary.uploader.upload(`app/images/${fileName}`,
        function(error, result) {
          fs.unlink(`app/images/${fileName}`, async () => {
            const uploadConfirmation = await userDataMapper.uploadProfilePicture(userId, result.url)
            if (uploadConfirmation.rowCount == 1) {
              return res.status(201).json({
                success: true, url: result.url
              });
            }
          });
      });
    } catch {
      res.status(400).json({
        error: new Error("upload failed, try again"),
      });
    }
  }
};


module.exports = cloudController;