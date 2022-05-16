const express = require('express');
const router = express.Router();
const mediaController = require("../controller/ctrl.media");
const auth = require('../middleware/auth');
const checkSignIn = require('../middleware/checkSignIn');


//Media Routes
router.get("/:library/bestrated", mediaController.getBestRated)
router.get("/:library/", auth, mediaController.getLibrary)
router.get("/:library/:apimediaid", checkSignIn, mediaController.getOneMedia)
router.post("/:library/:apimediaid", auth, mediaController.addOneReview) 
router.patch("/:library/:apimediaid", auth, mediaController.updateOneReview) 
router.delete("/:library/:apimediaid", auth, mediaController.deleteOneReview)



module.exports = router;
