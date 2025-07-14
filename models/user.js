const Sequelize = require('sequelize');
const sequelize = require('../db/database');


const MyModel = sequelize.define('MyModel', {

  user: {
    type: Sequelize.STRING,
    allowNull: true
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  pasword: {
    type: Sequelize.STRING,
    allowNull: true
  },

});

try {
  MyModel.sync({ force: false })
    .then(() => {
      console.log('Table created successfully.');
    })
    .catch(err => {
      console.error('Error creating table:', err);
    });
} catch (error) {
  console.error('Error:', error);
}


// MyModel.sync({ force: false })
//   .then(() => {
//     console.log('Table synchronized successfully.');
//   })
//   .catch(err => {
//     console.error('Error synchronizing table:', err);
//   });


module.exports = MyModel;
