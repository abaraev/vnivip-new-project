'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'acts', // Имя таблицы
            'type', // Имя нового поля
            {
                type: Sequelize.STRING, // Тип данных поля
                allowNull: true, // Разрешает ли поле быть пустым (null)
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'acts', // Имя таблицы
            'type' // Имя поля для удаления
        );
    }
};
