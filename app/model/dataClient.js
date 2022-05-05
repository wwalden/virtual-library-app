const { Pool } = require("pg");

const client = new Pool({
  connectionString: '',
  ssl:{
    rejectUnauthorized:false
  }
});

client.connect();

module.exports = client;