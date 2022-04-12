const postDB = require("../../data/post");
const urlDB = require("../../data/url");


async function post(req, res) {
  try {
    const { QR, title, body, location } = req.body.postInfo;
    const userId = req.userId;
    const createPostData = await postDB.createPost(
      QR,
      userId,
      title,
      body,
      location
    );
    const postId = createPostData.id;
    
    if (typeof "urls") {
      urls = JSON.parse(req.body.postInfo.urls);
    } else {
      urls = req.body.postInfo.urls;
    }
    for(let i=0; i<urls.length;i++){
      await urlDB.createUrl(
        urls[i],
        postId
      )
    }

    const result = { postId, QR, userId, title, body, location, urls };

    return res.status(201).json({ data: result, message: "게시글이 작성되었습니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  post,
}