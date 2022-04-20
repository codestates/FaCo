const postDB = require("../../data/post");
const urlDB = require("../../data/url");

async function modify(req, res) {
  try {
    const { title, body, location, postId, urls } = req.body.postInfo;
    // if (typeof "urls") {
    //   urls = JSON.parse(req.body.postInfo.urls);
    // } else {
    //   urls = req.body.postInfo.urls;
    // }
    postDB.modifyPost(title, body, location, postId);
    urlDB.deleteUrl(postId);

    for(let i=0; i<urls.length;i++){
      await urlDB.createUrl(
        urls[i],
        postId
      )
    }
    return res.status(201).json({ message: "게시글이 수정 되었습니다." })
  } catch (err) {
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  modify,
}