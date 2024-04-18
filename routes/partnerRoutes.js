// routes/partnerRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const partnerController = require('../controllers/partnerController');



// Validate request body for signup route
const signupValidation = [
    body('fullName', 'Full name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phoneNumber', 'Phone number is required').notEmpty(),
    body('gender', 'Gender is required').notEmpty(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    body('role', 'Role is required').notEmpty()
];



// Register a new partner account
router.post('/signup', signupValidation, partnerController.signup);

// Authenticate a partner
router.post('/login', partnerController.login);

// Protect routes below with authentication middleware
router.use(authMiddleware);



// Partner profile routes


router.get('/profile', partnerController.getProfile);
router.put('/profile', partnerController.updateProfile);
router.delete('/profile', partnerController.deleteProfile);

// Route to fetch all partner profiles
router.get('/profiles', partnerController.getAllProfiles);





module.exports = router;

