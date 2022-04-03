const { url } = require('../models');

async function findUrlById(postId) {
  return url.findAll({
    where: {
      post_id: postId,
    }
  })
}

async function allUrlInfo() {
  return url.findAll({});
}

async function createUrl(urlLink, postId) {
  return url.create({
    url:urlLink,
    post_id:postId,
  })
}

async function deleteUrl(postId) {
  return url.destroy({ where: { post_id: postId }})
}

module.exports = {
  findUrlById,
  allUrlInfo,
  createUrl,
  deleteUrl,
};