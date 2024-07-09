const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const staffController = require('../controllers/staffController');

const salonController = require('../controllers/salonController');

const serviceController = require('../controllers/serviceController');


// Validate request body for signup route
const signupValidation = [
    body('fullName', 'Full name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phoneNumber', 'Phone number is required').notEmpty(),
    body('gender', 'Gender is required').notEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

// Register a new customer account
router.post('/signup', signupValidation, userController.signup);

// Authenticate a customer
router.post('/login', userController.login);

// Define routes for user profile
router.get('/profiles', userController.getAllProfiles);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.delete('/profile', authMiddleware, userController.deleteProfile);




router.get('/customer/salons', salonController.getAllSalons);

// Get all services under a salon
router.get('/customer/salons/:id/services', serviceController.getAllServices);

// Get all staff under a salon
router.get('/customer/salons/:id/staff', staffController.getAllStaff);

module.exports = router;
