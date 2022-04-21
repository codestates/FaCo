const router = require("express").Router();
const { accessToken } = require("../middleware/accessToken");
const { postController } = require("../controllers");

router.post("/create", accessToken, postController.create);
router.get("/:type", postController.getPosts);

// 
router.delete("/", accessToken, postController.delete.unpost);
router.patch("/", accessToken, postController.modify.modify);

module.exports = router;
