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

async function modifyPost(title, body, location, url, postId) {
  if (title) {post.update({
    title,
  }, {where: { id: postId } })
  }
  if (body) {post.update({
    body,
  }, {where: { id: postId } })
  }
  if (location) {post.update({
    location,
  }, {where: { id: postId } })
  }
  if (url) {post.update({
    url,
  }, {where: { id: postId } })
  }
}

module.exports = {
  postInfo,
  findPostById,
  allPostInfo,
  createPost,
  deletePost,
  modifyPost,
};