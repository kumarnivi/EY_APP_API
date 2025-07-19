

const Employee = require('../models/employee')


// Post the User
const UserModel = async (req, res) => {
  try {
    const { category, fromDate, toDate, duration, reason } = req.body;

    const newRecord = await Employee.create({
      user: req.user.username,  // ✅ Taken from logged-in user
      category,
      fromDate,
      toDate,
      duration,
      reason,
      status: 'pending', // default status
    });

    res.status(201).json({ message: 'Leave applied successfully', data: newRecord });
  } catch (error) {
    console.error('Error creating leave record:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get All user Details
const getAllRecords = async (req, res) => {
  try {
    const records = await Employee.findAll();

    res.status(200).json({ data: records });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Get Single User
  const getSingleRecord = async (req, res) => {
    const { id } = req.params;
  
    try {
      const record = await Employee.findByPk(id);
  
      if (!record) {
        return res.status(404).json({ message: 'Record not found' });
      }
  
      res.status(200).json({ data: record });
    } catch (error) {
      console.error('Error fetching record:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



  const updateRecord = async (req, res) => {
    const { id } = req.params;
    try {
      const record = await Employee.findByPk(id);
      if (!record) {
        return res.status(404).json({ message: 'Record Not Found for This ID' });
      }
  
      // Update the record with the data from the request body
      const { user,category, fromDate, toDate, duration, reason, status} = req.body;
      await record.update({
        user,
        category,
        fromDate,
        toDate,
        duration,
        reason,
        status,
      });
  
      res.status(200).json({ message: 'Record updated successfully', data: record });
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

// Update only the status field (Admin or Manager only)
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const record = await Employee.findByPk(id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Only update status
    await record.update({ status });

    res.status(200).json({ message: 'Status updated successfully', data: record });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






  module.exports = { UserModel, getAllRecords, getSingleRecord, updateRecord, updateStatus}

  