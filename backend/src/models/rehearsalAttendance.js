'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RehearsalAttendance extends Model {
    static associate(models) {
      // Rehearsal association
      this.belongsTo(models.Rehearsal, { foreignKey: 'rehearsal_id', as: 'rehearsal' });
      
      // User association
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      
      // Recorder association
      this.belongsTo(models.User, { foreignKey: 'attendance_recorded_by', as: 'recorder' });
    }
  }
  
  RehearsalAttendance.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rehearsal_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'rehearsals',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    response_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'no_response',
      validate: {
        isIn: [['attending', 'not_attending', 'maybe', 'no_response']],
      },
    },
    response_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    attended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    attendance_recorded_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    attendance_recorded_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'RehearsalAttendance',
    tableName: 'rehearsal_attendance',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['rehearsal_id', 'user_id'],
      },
    ],
  });
  
  return RehearsalAttendance;
};