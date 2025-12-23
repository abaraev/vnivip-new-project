'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'members', // Имя таблицы
            'bio', // Имя нового поля
            {
                type: Sequelize.TEXT, // Тип данных поля
                allowNull: true, // Разрешает ли поле быть пустым (null)
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'members', // Имя таблицы
            'bio' // Имя поля для удаления
        );
    }
};
