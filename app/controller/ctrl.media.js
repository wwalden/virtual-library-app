const mediaDataMapper = require("../model/dataMapper.media");

const mediaController = {

  async getCollection(req,res) {
    // Pas encore OK: doit récupérer l'ID du user dans les params et le passer en argument au datamapper
    const results = await mediaDataMapper.getCollection();
    res.send(results);
  },

  async getOneMedia(req,res) {
    res.send('Hello World, this is getOneMedia');
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