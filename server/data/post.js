const db = require('../models');
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
  return post.findAll({
    include:[
      {model: db['url']}
    ]
  });
}

async function createPost(QR, userId, title, body, location) {
  return post.create({
    QR,
    userId,
    title,
    body,
    location,
  })
}

async function deletePost(postId) {
  return post.destroy({ where: { id: postId }})
}

async function modifyPost(title, body, location, postId) {
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
}

module.exports = {
  postInfo,
  findPostById,
  allPostInfo,
  createPost,
  deletePost,
  modifyPost,
};