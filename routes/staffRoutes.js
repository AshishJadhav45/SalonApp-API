const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');

// Validate request body for adding a new staff member
const staffValidation = [
  body('name', 'Name is required').notEmpty(),
  body('position', 'Position is required').notEmpty(),
];

// Protect routes below with authentication middleware
router.use(authMiddleware);

// Get all staff members by salon ID
router.get('/:id/staff', staffController.getAllStaff);

// Add a new staff member
router.post('/:id/staff', staffValidation, staffController.addStaff);

// Update staff member by ID
router.put('/:id/staff/:staffId', staffValidation, staffController.updateStaff);

// Delete staff member by ID
router.delete('/:id/staff/:staffId', staffController.deleteStaff);

module.exports = router;
