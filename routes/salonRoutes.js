const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const salonController = require('../controllers/salonController');
const authMiddleware = require('../middleware/authMiddleware');

// Validate request body for adding a new salon
const salonValidation = [
    body('name', 'Name is required').notEmpty(),
    body('address', 'Address is required').notEmpty(),
    body('city', 'City is required').notEmpty(),
    body('state', 'State is required').notEmpty(),
    body('country', 'Country is required').notEmpty(),
    body('zipCode', 'Zip code is required').notEmpty(),
    body('salonImage', 'image is required').notEmpty()

];

// Protect routes below with authentication middleware
router.use(authMiddleware);

// Add a new salon
router.post('/add', salonValidation, salonController.addSalon);

// Update salon details
router.put('/:id/edit',  salonController.editSalon);

// Get salon details by ID
router.get('/:id', salonController.getSalonById);

module.exports = router;
