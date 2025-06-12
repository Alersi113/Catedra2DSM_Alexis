'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('loans', [
      {
        id_user: 1, // Asegúrate de que este usuario exista
        id_book: 1, // Asegúrate de que este libro exista
        loan_date: '2025-06-01',
        devolution_date: '2025-06-08',
        status: 'prestado',
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 2,
        id_book: 2,
        loan_date: '2025-05-15',
        devolution_date: '2025-05-22',
        status: 'devuelto',
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 1,
        id_book: 3,
        loan_date: '2025-05-01',
        devolution_date: '2025-05-08',
        status: 'con retraso',
        eliminated: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('loans', null, {});
  }
};
