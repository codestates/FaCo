const router = require("express").Router();
const { accessToken } = require("../middleware/accessToken");
const { replyController } = require("../controllers");

router.post("/reply", accessToken, replyController.create.reply);
  
router.delete("/", accessToken, replyController.delete.unreply);

router.patch("/", accessToken, replyController.modify.modify);
  
module.exports = router;