'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('books', [
      {
        title: 'Cien años de soledad',
        author: 'Gabriel Garcia Marquez',
        genre: 'Fiction',
        publishDate: '1985-03-01',
        available: true,
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'El amor en los tiempos del cólera',
        author: 'Isabel Allende',
        genre: 'Historical',
        publishDate: '1990-09-15',
        available: true,
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'La casa de los espíritus',
        author: 'Sony',
        genre: 'Technology',
        publishDate: '1990-09-15',
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
