'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('gt_RthzvM6aN#9_!YI!h', 5); // ЗАМЕНИТЕ

    await queryInterface.bulkInsert('admins', [
      {
        login: 'vnivip34789', // ЗАМЕНИТЕ
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Опционально: добавьте логику для удаления админа при откате миграции
    await queryInterface.bulkDelete('admins', { login: 'vnivip34789' }); // ЗАМЕНИТЕ
  },
};

