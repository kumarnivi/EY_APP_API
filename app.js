
const express = require('express'); // for midileWare 
const bodyParser = require('body-parser'); // carch the request transformer
const cors = require('cors'); //

const sequelize = require('./db/database');
const MyModel = require('./models/user');
const Employee = require('./models/employee')
const UserRoute = require('./routes/userRoute')

const app = express();
app.use(express.json());

// const allowedOrigins = ['http://localhost:4200'];
// app.use(cors({
//   origin: allowedOrigins
// }));

 app.use(cors());

app.use('/api',  UserRoute)




// connet the server which using port
app.listen(8080, function (error) {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log("Server started on port 8080");
    }
  });
  