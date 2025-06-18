'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('band_members', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      band_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'bands',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'member',
      },
      instrument: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      joined_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });

    // Add unique constraint to prevent duplicate memberships
    await queryInterface.addConstraint('band_members', {
      fields: ['band_id', 'user_id'],
      type: 'unique',
      name: 'unique_band_member',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('band_members');
  },
};