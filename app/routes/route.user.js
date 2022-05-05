const express = require('express');
const router = express.Router();
const userController = require("../controller/ctrl.user");


// User Routes
  router.post("/login", userController.login)
  router.post("/register", userController.register)
  router.get("/profile/:id", userController.getProfile)
  router.patch("/profile/:id", userController.updateProfile)
  router.delete("/profile/:id", userController.deleteProfile)


// Testing purpose: check les users dans la BDD
const userDataMapper = require("../model/dataMapper.user");
router.get("/register", async (req, res) => {
  const results = await userDataMapper.getUserList();
  res.send(results.rows);
})




module.exports = router;
