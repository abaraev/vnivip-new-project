'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'news', // Имя таблицы
            'timestamp', // Имя нового поля
            {
                type: Sequelize.BIGINT, // Тип данных поля
                allowNull: true, // Разрешает ли поле быть пустым (null)
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'news', // Имя таблицы
            'timestamp' // Имя поля для удаления
        );
    }
};
