const client = require("./dataClient");

const mediaDataMapper = {
  async getCollection(){
    // query à modififer en triant sur un user spécifique
    const query = {
      text: `SELECT * FROM media`
    };
    const mediaList = await client.query(query);
    return mediaList;
  }
};

module.exports = mediaDataMapper;

