const postDB = require("../../data/post");

async function modify(req, res) {
  try {
    const { title, body, location, url, postId } = req.body;

    postDB.modifyPost(title, body, location, url, postId);
    
    return res.status(201).json({ message: "게시글이 수정 되었습니다." })
  } catch (err) {
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  modify,
}