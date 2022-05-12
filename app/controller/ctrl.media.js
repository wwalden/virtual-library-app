const mediaDataMapper = require("../model/dataMapper.media");

const mediaController = {

  async getLibrary(req,res) {
    // On récupère l'ID du user depuis les "locals", défini dans le middleware d'authentification
    const userid = res.locals.user;
    const userInParams = req.params.userid;
    if (userid !== userInParams) {
      return res.status(401).json({ error: 'wrong user' });
    }
    const library = req.params.library;
    const results = await mediaDataMapper.getLibrary(userid, library);
    res.send(results.rows);
  },

  async getBestRated(req,res) {
    const userid = res.locals.user;

    const library = req.params.library;
    const results = await mediaDataMapper.getBestRated(library);
    res.send(results.rows);
  },

  async getOneMedia(req,res) {
    const userid = res.locals.user;
    const { mediaid, library } = req.params;

    if (userid == 0) {
      const results = await mediaDataMapper.getAverageRatingForOne(mediaid, library);
      if(results.rows == []) {
        res.send("no average rating");
      }
      res.send(results.rows);
    }

    const results = await mediaDataMapper.getReviewDetails(userid, mediaid, library);
    res.send(results.rows);
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