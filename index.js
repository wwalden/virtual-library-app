require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const userRoutes = require('./app/routes/route.user');
const mediaRoutes = require('./app/routes/route.media');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api', userRoutes, mediaRoutes);


// test welcome message
app.get('/', (req, res) => {
  res.send("hello L & L ! This is Collectio API")
})


const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


// this is a test

