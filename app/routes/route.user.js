const express = require('express');
const router = express.Router();
const userController = require("../controller/ctrl.user");
const auth = require('../middleware/auth');


// User Routes
  router.post("/login", userController.login)
  router.post("/register", userController.register)
  router.get("/profile/:id", auth, userController.getProfile)
  router.patch("/profile/:id", auth, userController.updateProfile)
  router.delete("/profile/:id", auth, userController.deleteProfile) 



// Testing purpose only: check les users dans la BDD
const userDataMapper = require("../model/dataMapper.user");
router.get("/register", async (req, res) => {
  const results = await userDataMapper.getUserList();
  res.send(results.rows);
})




module.exports = router;
