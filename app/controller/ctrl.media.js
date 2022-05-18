const mediaDataMapper = require("../model/dataMapper.media");

const mediaController = {

  async getLibrary(req,res) {
    const userid = res.locals.user;
    const library = req.params.library;
    const results = await mediaDataMapper.getLibrary(userid, library);
    res.status(200).json(results.rows);
  },

  async getBestRated(req,res) {
    const library = req.params.library;
    const results = await mediaDataMapper.getBestRated(library);
    res.status(200).json(results.rows);
  },

  async getOneMedia(req,res) {
    const userid = res.locals.user;
    const { library, apimediaid } = req.params;
    console.log(userid)
    if (userid == 0) {
      const results = await mediaDataMapper.getAverageRatingForOne(apimediaid, library);
      if (results.rows == [] || results.rows[0].note_moyenne == null) {
        res.status(200).json({ message: 'not enough ratings to provide an average rating' });
      } else {
        res.status(200).json(results.rows);
      }
    } else {
      const results = await mediaDataMapper.getReviewDetails(userid, apimediaid, library);
      if (results.rows == '') {
        res.status(200).json({ message: 'This Media is not in user Library yet' });
      } else {
        res.status(200).json(results.rows);
      }
    }
  },

  async addOneReview(req,res) {
    const {library, apimediaid } = req.params;
    const userid = res.locals.user
    const { list, title, coverURL } = req.body
    const result = await mediaDataMapper.verifyMedia(apimediaid, library)
    if (result.rowCount == 0) {
      const addedMedia = await mediaDataMapper.addOneMedia(library, apimediaid, title, coverURL)
    }
    const newReview = await mediaDataMapper.addReview(userid, apimediaid, list, library)
    res.status(201).json({ message: 'Review successfully created' });
  },

  async updateOneReview(req,res) {
    const { library, apimediaid } = req.params;
    const userid = res.locals.user;
    const { list, note, comment, consumptionDate } = req.body
    const updatedReview = await mediaDataMapper.updateOneReview(userid, library, apimediaid, list, note, comment, consumptionDate)
    res.status(200).json({ message: 'Review is updated' });
  },

  async deleteOneReview(req,res) {
    const { library, apimediaid } = req.params;
    const userid = res.locals.user;
    const deletedReview = await mediaDataMapper.deleteOneReview(userid, library, apimediaid)
    res.status(200).json({ message: 'The Review is now deleted from User Library' });
  }
};

module.exports = mediaController;