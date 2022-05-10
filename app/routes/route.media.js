const express = require('express');
const router = express.Router();
const mediaController = require("../controller/ctrl.media");
const auth = require('../middleware/auth');


//Media Routes
router.get("/:library/bestrated", auth, mediaController.getBestRated) // ok
// router.get("/:userid/collection", mediaController.getCollection) // To Do
router.get("/user/:userid/:library/", auth, mediaController.getLibrary) // ok
router.get("/user/:userid/:library/:mediaid", mediaController.getOneMedia) // ajouter le middleware auth // To Do
router.post("/user/:userid/:library/:mediaidid", mediaController.addOneMedia) // ajouter le middleware auth // To Do
router.patch("/user/:userid/:library/:mediaidid", mediaController.updateOneMedia) // ajouter le middleware auth // To Do
router.delete("/user/:userid/:library/:mediaidid", mediaController.deleteOneMedia) // ajouter le middleware auth // To Do



module.exports = router;
