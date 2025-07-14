const Sequelize = require('sequelize');
const sequelize = require('../db/database');


const Employee = sequelize.define('Employee', {
    user:{
        type: Sequelize.STRING,
        allowNull: false
    },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fromDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  toDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'pending', 
  },
  
});

try {
    Employee.sync({ force: false })
    .then(() => {
      console.log('Table created successfully.');
    })
    .catch(err => {
      console.error('Error creating table:', err);
    });
} catch (error) {
  console.error('Error:', error);
}



module.exports = Employee;