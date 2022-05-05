

const dataMapper = {
  async getData(){
    const query = {
      text: `SELECT * FROM media`
    };
    const mediaList = await client.query(query);
    return mediaList;
},



};

module.exports = dataMapper;

