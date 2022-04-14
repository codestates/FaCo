const postDB = require("../../data/post")
const urlDB = require("../../data/url")

async function unpost(req, res) {
  try {
    const { postId }  = req.body.postInfo;
    postDB.deletePost(postId);
    urlDB.deleteUrl(postId);

    return res.status(201).json({ message: "게시글이 삭제되었습니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  unpost,
}