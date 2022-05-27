const { Pool } = require("pg");

const client = new Pool({
  connectionString: `${process.env.DB_URI}`,
  ssl:{
    rejectUnauthorized:false
  }
});

client.connect();

module.exports = client;