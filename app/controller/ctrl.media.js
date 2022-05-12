const mediaDataMapper = require("../model/dataMapper.media");

const mediaController = {

  async getLibrary(req,res) {
    const userid = res.locals.user;
    const library = req.params.library;
    const results = await mediaDataMapper.getLibrary(userid, library);
    res.send(results.rows);
  },

  async getBestRated(req,res) {
    const library = req.params.library;
    const results = await mediaDataMapper.getBestRated(library);
    res.send(results.rows);
  },

  async getOneMedia(req,res) {
    const userid = res.locals.user;
    const {library, mediaid } = req.params;
    if (userid == 0) {
      const results = await mediaDataMapper.getAverageRatingForOne(mediaid, library);
      if (results.rows == []) {
        res.send("no average rating");
      } else {
        res.send(results.rows);
      }
    } else {
      const results = await mediaDataMapper.getReviewDetails(userid, mediaid, library);
      res.send(results.rows);
    }
  },



  async addOneMedia(req,res) {
    res.send('Hello World, this is addOneMedia');
  },

  async updateOneMedia(req,res) {
    res.send('Hello World, this is updateOneMedia');
  },

  async deleteOneMedia(req,res) {
    res.send('Hello World, this is deleteOneMedia');
  }

};

module.exports = mediaController;