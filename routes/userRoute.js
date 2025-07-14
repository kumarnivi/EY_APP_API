const express = require('express');
const { UserModel, getAllRecords, getSingleRecord, updateRecord, updateStatus}  = require('../controllers/userController') 
const { verifyToken, allowRoles } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/applyleave', UserModel);

router.get('/getAllRecords', getAllRecords);

router.get('/records/:id', getSingleRecord);

router.put('/update/:id', updateRecord );


// Only admin or manager can change status
router.patch('/status/:id', verifyToken, allowRoles('admin', 'manager'), updateStatus);


module.exports = router;