'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProductDetails', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            product_code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            design: {
                type: Sequelize.STRING,
                allowNull: false
            },
            material: {
                type: Sequelize.STRING,
                allowNull: false
            },
            colors: {
                type: Sequelize.STRING,
                allowNull: false
            },
            origin: {
                type: Sequelize.STRING,
                allowNull: false
            },
            vat_included: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products', // Tên bảng Product trong database
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ProductDetails');
    }
};
