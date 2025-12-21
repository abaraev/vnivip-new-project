'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'orders', // Имя таблицы
            'comment', // Имя нового поля
            {
                type: Sequelize.STRING, // Тип данных поля
                allowNull: true, // Разрешает ли поле быть пустым (null)
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'orders', // Имя таблицы
            'comment' // Имя поля для удаления
        );
    }
};
