const { DataTypes } = require('sequelize');
const sequelize = require('./db')

const User = sequelize.define('User', {
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
    tableName: 'user', // Set the table name explicitly
});

module.exports = User;