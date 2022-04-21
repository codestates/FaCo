const postDB = require("../../data/post");
const urlDB = require("../../data/url");


async function post(req, res) {
  try {
    const { QR, title, body, location, urls } = req.body.postInfo;
    const userId = req.userId;
    
    const postResult = await postDB.createPost(
      QR,
      userId,
      title,
      JSON.stringify(body),
      location
    );

    for (let i = 0; i < urls.length; i++) {
      await urlDB.createUrl(urls[i], postResult.id);
    }

    const result = await urlDB.findByPostId(postResult.id);

    return res.status(201).json({ data: result, message: "게시글이 작성되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  post,
}