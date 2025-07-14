
const express = require('express'); // for midileWare 
const bodyParser = require('body-parser'); // carch the request transformer
const cors = require('cors'); //

const sequelize = require('./db/database');
const MyModel = require('./models/user');
const Employee = require('./models/employee')
const UserRoute = require('./routes/userRoute')
const authRoutes = require('./routes/authRoute');
const { verifyToken, allowRoles } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// const allowedOrigins = ['http://localhost:4200'];
// app.use(cors({
//   origin: allowedOrigins
// }));

 app.use(cors());

app.use('/api', authRoutes);

app.use('/api',  UserRoute)


// / Protected route - only accessible by admin
app.get('/admin-only', verifyToken, allowRoles('admin'), (req, res) => {
  res.json({ message: 'Hello Admin!' });
});

// Accessible by admin or manager
app.get('/manager-dashboard', verifyToken, allowRoles('admin', 'manager'), (req, res) => {
  res.json({ message: 'Manager/Admin Dashboard' });
});

// Accessible by all logged-in users
app.get('/user-profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});


// connet the server which using port
app.listen(8080, function (error) {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log("Server started on port 8080");
    }
  });
  
