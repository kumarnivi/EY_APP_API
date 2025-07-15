const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// 🔒 Only admin can access
router.get('/all-users', verifyToken, allowRoles('admin'), getAllUsers);

module.exports = router;
