'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate(models) {
      // Creator association
      this.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      
      // Band members association
      this.hasMany(models.BandMember, { foreignKey: 'band_id', as: 'members' });
      
      // Rehearsals association
      this.hasMany(models.Rehearsal, { foreignKey: 'band_id', as: 'rehearsals' });
    }
  }
  
  Band.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    underscored: true,
  });
  
  return Band;
};