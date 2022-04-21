const { create } = require("./create");
const { getPosts } = require("./getPosts");

module.exports = {
    create,
    getPosts,
    delete: require("./delete"),
    modify: require("./modify"),
};