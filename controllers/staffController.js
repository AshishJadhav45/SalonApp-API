// controllers/staffController.js

const Staff = require('../models/staff');
const { validationResult } = require('express-validator');

exports.getAllBySalonId = async (req, res) => {
  try {
    const salonId = req.params.id;
    const staff = await Staff.getAllBySalonId(salonId);
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, position } = req.body;
  const salonId = req.params.id;

  try {
    const newStaffId = await Staff.create(salonId, name, position);
    res.json({ msg: 'Staff created successfully', staffId: newStaffId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.updateById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, position } = req.body;
  const staffId = req.params.staffId;

  try {
    await Staff.updateById(staffId, name, position);
    res.json({ msg: 'Staff updated successfully', staffId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteById = async (req, res) => {
  const staffId = req.params.staffId;

  try {
    await Staff.deleteById(staffId);
    res.json({ msg: 'Staff deleted successfully', staffId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
