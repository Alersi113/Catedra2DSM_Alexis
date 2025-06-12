'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        name: 'Alex',
        lastName: 'Turner',
        mail: 'alex.turner@example.com',
        password: bcrypt.hashSync('password123', salt),
        isActive: true,
        isBaseUser: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily',
        lastName: 'Blunt',
        mail: 'emily.blunt@example.com',
        password: bcrypt.hashSync('password123', salt),
        isActive: true,
        isBaseUser: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
