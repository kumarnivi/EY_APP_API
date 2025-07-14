const express = require('express');
const { UserModel, getAllRecords, getSingleRecord, updateRecord}  = require('../controllers/userController') 

const router = express.Router();


router.post('/applyleave', UserModel);

router.get('/getAllRecords', getAllRecords);

router.get('/records/:id', getSingleRecord);

router.put('/update/:id', updateRecord );


module.exports = router;