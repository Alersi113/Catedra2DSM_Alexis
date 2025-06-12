'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('books', [
      {
        author: 'Gabriel Garcia Marquez',
        gender: 'Fiction',
        publish_date: '1985-03-01',
        available: true,
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'Isabel Allende',
        gender: 'Historical',
        publish_date: '1990-09-15',
        available: true,
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'Sony',
        gender: 'Technology',
        publish_date: '1990-09-15',
        available: true,
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('books', null, {});
  }
};
