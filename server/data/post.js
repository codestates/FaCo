const { post } = require('../models');

async function postInfo(userId) {
  return post.findOne({
    where: {
      userId: userId,
    }
  })
}

async function findPostById(postId) {
  return post.findOne({
    where: {
      id: postId,
    }
  })
}

async function allPostInfo() {
  return post.findAll({});
}

async function createPost(QR, userId, title, body, location, url) {
  return post.create({
    QR,
    userId,
    title,
    body,
    location,
    url,
  })
}

async function deletePost(postId) {
  return post.destroy({ where: { id: postId }})
}

async function modifyPost(title, body, location, url) {
  return post.update({
    title: title,
    body: body,
    location: location,
    url: url,
  })
}

module.exports = {
  postInfo,
  findPostById,
  allPostInfo,
  createPost,
  deletePost,
  modifyPost,
};