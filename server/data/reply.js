const { reply } = require('../models');

async function replyInfo(userId) {
  return reply.findOne({
    where: {
      userId: userId,
    }
  })
}

async function createReply(body, userId, postId) {
  return reply.create({
    body,
    userId,
    postId,
  })
}

async function deleteReply(replyId) {
  return reply.destroy({ where: { id: replyId }})
}

async function modifyReply(body, replyId) {
  return reply.update({ body }, { where: { id: replyId } })
}

module.exports = {
  replyInfo,
  createReply,
  deleteReply,
  modifyReply,
};