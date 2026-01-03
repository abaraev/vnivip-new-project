'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'competitions', // Имя таблицы
            'closed', // Имя нового поля
            {
                type: Sequelize.BOOLEAN, // Тип данных поля
                allowNull: false, // Разрешает ли поле быть пустым (null)
                defaultValue: false,
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'competitions', // Имя таблицы
            'closed' // Имя поля для удаления
        );
    }
};
