'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      
      return queryInterface.createTable('orders', {
      
        id: { 
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true,
          allowNull: false
        },

        client: {
          type: Sequelize.STRING,
          allowNull: false
        },

        tel: {
          type: Sequelize.STRING,
          allowNull: false
        },

        details: {
          type: Sequelize.TEXT,
        },

        location: {
          type: Sequelize.STRING,
          allowNull: false
        },
  
        status: {
          type: Sequelize.ENUM('in progress', 'delivered', 'on hold','canceled'),
          defaultValue: 'on hold',
          allowNull: false
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }

      });
  
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('orders');
  }
};
