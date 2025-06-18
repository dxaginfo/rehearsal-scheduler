'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BandMember extends Model {
    static associate(models) {
      // User association
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      
      // Band association
      this.belongsTo(models.Band, { foreignKey: 'band_id', as: 'band' });
    }
  }
  
  BandMember.init({
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'member',
      validate: {
        isIn: [['admin', 'member']],
      },
    },
    instrument: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    joined_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'BandMember',
    tableName: 'band_members',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['band_id', 'user_id'],
      },
    ],
  });
  
  return BandMember;
};