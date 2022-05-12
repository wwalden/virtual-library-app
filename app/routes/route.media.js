const express = require('express');
const router = express.Router();
const mediaController = require("../controller/ctrl.media");
const auth = require('../middleware/auth');
const checkSignIn = require('../middleware/checkSignIn');


//Media Routes
router.get("/:library/bestrated", mediaController.getBestRated)
router.get("/:library/", auth, mediaController.getLibrary)
router.get("/:library/:mediaid", checkSignIn, mediaController.getOneMedia)
//router.post("/user/:userid/:library/:mediaidid", mediaController.addOneReview) // ajouter le middleware auth // To Do
//router.patch("/user/:userid/:library/:mediaidid", mediaController.updateOneReview) // ajouter le middleware auth // To Do
//router.delete("/user/:userid/:library/:mediaidid", mediaController.deleteOneReview) // ajouter le middleware auth // To Do



module.exports = router;
