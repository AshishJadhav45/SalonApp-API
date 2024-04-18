const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const salonServiceController = require('../controllers/salonServiceController');
const authMiddleware = require('../middleware/authMiddleware');

// Validate request body for adding a new service
const addServiceValidation = [
    body('name', 'Name is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('price', 'Price is required').notEmpty().isNumeric(),
];

// Protect routes below with authentication middleware
router.use(authMiddleware);

// Salon service routes
router.get('/:id/services', salonServiceController.getAllServices);
router.post('/:id/services', addServiceValidation, salonServiceController.addService);
router.put('/:id/services/:serviceId', addServiceValidation, salonServiceController.updateService);
router.delete('/:id/services/:serviceId', salonServiceController.deleteService);

module.exports = router;
