'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('posts', 'QR', 'type');
    await queryInterface.addColumn('posts', 'weather', {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn('posts', 'userId');
    await queryInterface.addColumn("posts","user_id",{
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("posts",{
      fields: ["user_id"],
      type: "foreign key",
      name: "users_posts_id_fk",
      references:{
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
  }
};

