const dataMapper = require("../model/dataMapper");


const userController = {
  async getDbData(req,res) {
    const results = await dataMapper.getData();
    res.send(results);
    //res.send('Hello World');
  }
};

module.exports = userController;