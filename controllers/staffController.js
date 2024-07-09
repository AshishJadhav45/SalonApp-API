const Staff = require('../models/staff');
const { validationResult } = require('express-validator');

// Get all staff members by salon ID
exports.getAllStaff = async (req, res) => {
  try {
      const salonId = req.params.id;
      const staff = await Staff.getAllBySalonId(salonId);
      res.json(staff);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server Error' });
  }
};

// Add a new staff member
exports.addStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, position } = req.body;
  const salonId = req.params.id;

  try {
    const newStaffId = await Staff.addStaff(salonId, name, position);
    res.json({ msg: 'Staff added successfully', staffId: newStaffId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Update staff member by ID
exports.updateStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, position } = req.body;
  const staffId = req.params.staffId;

  try {
    await Staff.updateStaff(staffId, name, position);
    res.json({ msg: 'Staff updated successfully', staffId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Delete staff member by ID
exports.deleteStaff = async (req, res) => {
  const staffId = req.params.staffId;

  try {
    await Staff.deleteStaff(staffId);
    res.json({ msg: 'Staff deleted successfully', staffId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
