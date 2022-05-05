const express = require('express');
const router = express.Router();
const mediaController = require("../controller/ctrl.media");


// for testing purpose
router.get("/testing", mediaController.secondTest);

//Media Routes
  // router.get("/:userid/media", mediaController.getCollection)
  // router.get("/:userid/media/:mediaid", mediaController.getOneMedia)
  // router.post("/:userid/media/:mediaidid", mediaController.addOneMedia)
  // router.patch("/:userid/media/:mediaidid", mediaController.updateOneMedia)
  // router.delete("/:userid/media/:mediaidid", mediaController.deleteOneMedia)



module.exports = router;
