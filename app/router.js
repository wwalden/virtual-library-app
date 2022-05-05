const express = require('express');
const router = express.Router();
const controller = require("./controller/controller");



router.get("/testdb", controller.getDbData);


module.exports = router;
