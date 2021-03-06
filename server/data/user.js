const { user } = require("../models");

async function findUserById(id) {
  return user.findOne({
    where: { id: id },
  });
}

async function findUserByEmail(email) {
  return user.findOne({ where: { email: email } });
}

async function resultUserByEmail(email) {
  const searchEmail = await user.findOne({ where: { email: email }});
  return searchEmail ? searchEmail : false;
}

async function resultUserById(id) {
  const searchUserId = await user.findOne({
    where: { id: id },
  });
  return searchUserId ? searchUserId : false;
}

async function createUser(email, name, password, phone, location, salt, sex) {
  return user.create({
    email,
    name,
    password,
    phone,
    location,
    salt,
    sex
  });
}

async function modifyUser(userId, password, phone, location, salt) {
  return user.update(
    {
      password: password,
      phone: phone,
      location: location,
      salt: salt,
    },
    { where: { id: userId } },
  );
}

async function withdrawUser(userId) {
  return user.destroy({ where: { id: userId } });
}

async function findUserInfo(userId) {
  return user.findAll({
    where: { id: userId },
    attributes: ["id", "email", "name", "phone", "location", "sex"]
  })
}

module.exports = {
  findUserById,
  findUserByEmail,
  resultUserByEmail,
  resultUserById,
  createUser,
  modifyUser,
  withdrawUser,
  findUserInfo,
};