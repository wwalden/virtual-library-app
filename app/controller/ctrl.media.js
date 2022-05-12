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
      // voir si rows[0] = "", renvoyer un message clair pour préciser qu'il n'y a pas de review pour ce user/media
      res.send(results.rows);
    }
  },



  async addOneReview(req,res) {
    // check si le Media existe déjà en DB
    // Non? le créer
    // Oui? créer uniquement la review
    
    
    

  },

  async updateOneReview(req,res) {
    // Patch dans la table review du user

  },

  async deleteOneReview(req,res) {
    // Delete dans la table review du user

  }

};

module.exports = mediaController;