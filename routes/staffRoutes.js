// routes/staffRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const staffController = require('../controllers/staffController');

// Validate request body for staff creation and update
const staffValidation = [
  body('name', 'Name is required').notEmpty(),
  body('position', 'Position is required').notEmpty(),
];

// Get all staff members by salon ID
router.get('/salon/:id/staff', staffController.getAllBySalonId);

// Create a new staff member
router.post('/salon/:id/staff', staffValidation, staffController.create);

// Update staff member by ID
router.put('/salon/:id/staff/:staffId', staffValidation, staffController.updateById);

// Delete staff member by ID
router.delete('/salon/:id/staff/:staffId', staffController.deleteById);

module.exports = router;
