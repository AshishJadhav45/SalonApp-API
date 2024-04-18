const { body } = require('express-validator');

// Validation rules for signup route
exports.signupValidation = [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('password').isLength({ min: 6 }).withMessage('Please enter a password with 6 or more characters'),
    body('role').notEmpty().withMessage('Role is required')
];
