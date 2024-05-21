// database/models/User.js
const { DataTypes, ENUM } = require('sequelize');
const { sequelize } = require('../database_connection');

const Announcement = sequelize.define('Announcement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  announcement_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['approved', 'waiting_for_approvation', 'not_approved'],
    allowNull: false,
    defaultValue: 'waiting_for_approvation'
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  file_path: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'announcements'
});

Announcement.sync({});

module.exports = Announcement;