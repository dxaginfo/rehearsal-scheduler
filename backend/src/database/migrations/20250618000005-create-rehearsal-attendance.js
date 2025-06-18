'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rehearsal_attendance', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      rehearsal_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'rehearsals',
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
      response_status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'no_response',
        validate: {
          isIn: [['attending', 'not_attending', 'maybe', 'no_response']],
        },
      },
      response_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      attended: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      attendance_recorded_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      attendance_recorded_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

    // Add unique constraint to prevent duplicate entries
    await queryInterface.addConstraint('rehearsal_attendance', {
      fields: ['rehearsal_id', 'user_id'],
      type: 'unique',
      name: 'unique_rehearsal_attendance',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('rehearsal_attendance');
  },
};