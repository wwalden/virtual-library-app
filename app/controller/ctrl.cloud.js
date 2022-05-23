const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const path = require("path");
const userDataMapper = require("../model/dataMapper.user");

const cloudController = {
  async uploadPicture(req, res) {
    try {
      const userId = res.locals.user;
      if (userId != req.params.id) {
        return res.status(403).json({ error: 'forbidden' });
      } else {
        const fileName = req.file.filename;
        const imgPath = path.join(__dirname, '../images/', fileName);
        await cloudinary.uploader.upload(imgPath,
          function(error, result) {
            fs.unlink(path.join(__dirname, '../images/', fileName), async () => {
              const uploadConfirmation = await userDataMapper.uploadProfilePicture(userId, result.url)
              if (uploadConfirmation.rowCount == 1) {
                return res.status(201).json({
                  success: true, url: result.url
                });
              }
            });
        });
      }
    } catch {
      res.status(400).json({
        error: new Error("upload failed, try again"),
      });
    }
  }
};

module.exports = cloudController;