const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  username: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: {
    type: Sequelize.ENUM('admin', 'manager', 'user'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});

User.sync({ alter: false });

module.exports = User;
