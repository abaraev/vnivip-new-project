'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'competitions', // Имя таблицы
            'documents', // Имя нового поля
            {
                type: Sequelize.TEXT, // Тип данных поля
                allowNull: true, // Разрешает ли поле быть пустым (null)
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'competitions', // Имя таблицы
            'documents' // Имя поля для удаления
        );
    }
};
