'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.hasMany(models.url, {foreignKey: "post_id"})
    }
  }
  post.init({
    QR: DataTypes.STRING,
    userId: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
}