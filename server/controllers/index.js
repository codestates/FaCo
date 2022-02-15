const express = require("express");
const router = express.Router();
const userRouter = require("./user/index");

router.post("/signup", userRouter.signUp);
router.post("/signin", userRouter.signIn);
router.post("/signout", userRouter.signOut);

module.exports = router;