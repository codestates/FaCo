const postDB = require("../../data/post");
const urlDB = require("../../data/url");


async function post(req, res) {
  try {
    // console.log(req.body.postInfo)
    const { QR, title, body, location, urls} = req.body.postInfo;
    const userId = req.userId;
    const createPostData = await postDB.createPost(
      QR,
      userId,
      title,
      JSON.stringify(body),
      location
    );
    const postId = createPostData.id;
    
    
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