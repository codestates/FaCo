const db = require('../models');
const { post, user, url } = require('../models');

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

async function createPost(type, title, user_id, weather, location, body) {
  const postResult = await post.create({
    type,
    title,
    user_id,
    weather,
    location,
    body,
  });

  return postResult;
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

async function getPostsByType(type) {
  const postResult = await post.findAll({
    where: {
      type: type,
    }, 
    attributes: {
      exclude: ['updatedAt']
    },
    include: [
      {
        model: user,
        attributes: ['name'],
      }
    ]
  });

  for (let i = 0; i < postResult.length; i++) {
    const result = await url.findAll({
      where: {
        post_id: postResult[i].id,
      },
      attributes: ['name', 'url'],
    });
    postResult[i].dataValues.img = result;
  }
  
  return postResult;
}

module.exports = {
  postInfo,
  findPostById,
  allPostInfo,
  createPost,
  deletePost,
  modifyPost,
  getPostsByType,
};