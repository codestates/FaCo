'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("urls","post_id",{
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("urls",{
      fields: ["post_id"],
      type: "foreign key",
      name: "posts_urls_id_fk",
      references:{
        table: "posts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("urls","post_id");
  }
};