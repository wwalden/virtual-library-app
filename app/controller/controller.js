const dataMapper = require("../model/dataMapper");


const controller = {
  async getDbData(req,res) {
    //const results = await dataMapper.getData();
    //res.send(results);
    res.send('Hello World');
  }
};

module.exports = controller;