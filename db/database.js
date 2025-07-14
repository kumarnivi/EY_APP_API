
const Sequelize = require('sequelize');

// const sequelize = new Sequelize('mydb', 'root', 'root0', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

const sequelize = new Sequelize('bpuimhpednzk8ebzbzxg', 'uxwbhkqhrhocxx1h', 'NXxYdz7ZXbCNhy1R6oQo', {
  host: 'bpuimhpednzk8ebzbzxg-mysql.services.clever-cloud.com',
  dialect: 'mysql'
});



// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = sequelize;

