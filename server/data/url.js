const { url } = require('../models');
const { post } = require('../models');

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
  const result = await url.create({
    url: urlLink.url,
    name: urlLink.name,
    post_id: postId,
  });
  return result;
}

async function deleteUrl(postId) {
  return url.destroy({ where: { post_id: postId }})
}

async function findByPostId(postId) {
  const result = await url.findAll({
    where: {
      post_id: postId,
    },
    include: [
      {
        model: post,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
          ]
        }
      }
    ],
  });

  console.log(result)
  return result;
}

module.exports = {
  findUrlById,
  allUrlInfo,
  createUrl,
  deleteUrl,
  findByPostId,
};