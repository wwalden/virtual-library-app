

const dataMapper = {
  async getDbData(){
    const query = {
      text: `SELECT * FROM media`
    };
    const mediaList = await client.query(query);
    return mediaList;
},



};

module.exports = dataMapper;

