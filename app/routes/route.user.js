const express = require('express');
const router = express.Router();
const userController = require("../controller/ctrl.user");

// for testing purpose
router.get("/testdb", userController.getDbData);

// User Routes
  // router.post("login", userController.login)
  // router.post("register", userController.register)
  // router.get("profile/:id", userController.getProfile)
  // router.patch("profile/:id", userController.updateProfile)
  // router.delete("profile/:id", userController.deleteProfile)




module.exports = router;
