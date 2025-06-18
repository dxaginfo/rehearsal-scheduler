'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rehearsal extends Model {
    static associate(models) {
      // Band association
      this.belongsTo(models.Band, { foreignKey: 'band_id', as: 'band' });
      
      // Creator association
      this.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      
      // Attendance association
      this.hasMany(models.RehearsalAttendance, { foreignKey: 'rehearsal_id', as: 'attendances' });
      
      // Rehearsal items association
      this.hasMany(models.RehearsalItem, { foreignKey: 'rehearsal_id', as: 'items' });
    }
  }
  
  Rehearsal.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    band_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartTime(value) {
          if (new Date(value) <= new Date(this.start_time)) {
            throw new Error('End time must be after start time');
          }
        },
      },
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    is_cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancellation_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Rehearsal',
    tableName: 'rehearsals',
    underscored: true,
  });
  
  return Rehearsal;
};