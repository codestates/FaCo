const router = require("express").Router();
const { accessToken } = require("../middleware/accessToken");
const { likeController } = require("../controllers");

router.post("/", accessToken, likeController.like.likePost,);

module.exports = router;