'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Band membership associations
      this.hasMany(models.BandMember, { foreignKey: 'user_id', as: 'bandMemberships' });
      this.hasMany(models.Band, { foreignKey: 'created_by', as: 'createdBands' });
      
      // Availability associations
      this.hasMany(models.Availability, { foreignKey: 'user_id', as: 'availabilities' });
      
      // Rehearsal associations
      this.hasMany(models.Rehearsal, { foreignKey: 'created_by', as: 'createdRehearsals' });
      this.hasMany(models.RehearsalAttendance, { foreignKey: 'user_id', as: 'rehearsalAttendances' });
      
      // Notification associations
      this.hasMany(models.Notification, { foreignKey: 'user_id', as: 'notifications' });
    }
    
    async isPasswordMatch(password) {
      return bcrypt.compare(password, this.password_hash);
    }
  }
  
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeSave: async (user) => {
        // Only hash the password if it has been modified (or is new)
        if (user.changed('password_hash')) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      },
    },
  });
  
  return User;
};