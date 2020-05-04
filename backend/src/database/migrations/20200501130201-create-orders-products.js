'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('order_products', { 
        
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull:false
        },

        order_id: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: {
            model:'orders',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },

        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model:'products',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL'
        },

        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        }

      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('order_products');
  }
};
