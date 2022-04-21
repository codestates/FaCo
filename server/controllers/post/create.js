const postDB = require("../../data/post");
const urlDB = require("../../data/url");


async function create(req, res) {
  try {
    const { type, title, weather, location, body, urls } = req.body;
    const user_id = req.userId;
    
    const postResult = await postDB.createPost(
      type,
      title,
      user_id,
      weather,
      location,
      JSON.stringify(body),
    );

    for (let i = 0; i < urls.length; i++) {
      await urlDB.createUrl(urls[i], postResult.id);
    }

    const result = await urlDB.findByPostId(postResult.id);

    return res.status(201).json({ data: result, message: "게시글이 작성되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "create post server error" });
  }
}

module.exports = {
  create,
}
