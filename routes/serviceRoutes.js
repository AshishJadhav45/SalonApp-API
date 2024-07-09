// routes/serviceRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

// Validate request body for adding a new service
const addServiceValidation = [
    body('name', 'Name is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('price', 'Price is required').notEmpty().isNumeric(),
];

// Protect routes below with authentication middleware
// router.use(authMiddleware);

// Salon service routes
router.get('/:id/services', serviceController.getAllServices);
router.post('/:id/services', addServiceValidation, serviceController.addService);
router.put('/:id/services/:serviceId', serviceController.updateService);
router.delete('/:id/services/:serviceId', serviceController.deleteService);
router.get('/all', serviceController.getAllServices);

module.exports = router;
