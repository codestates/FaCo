const postDB = require("../../data/post");
const urlDB = require("../../data/url");


async function getPosts(req, res) {
  try {
    const { type }  = req.params;
    const postResult = await postDB.getPostsByType(type);

    postResult.map(el => {
      const info = el.dataValues;
      const writer = info.user.name;
      delete info.user;
      delete info.user_id;
      info.writer = writer;
      info.like = 0; // like 추가 하면 수정
      return el;
    });
    
    return res.status(201).json({ data: postResult, message: `${type}게시글 입니다.` });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "get post server error" });
  }
}

module.exports = {
  getPosts,
}
