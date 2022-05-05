require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());


const router = require('./app/router')
app.use(router);




const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


