// routes/adminAuthRoutes.js

const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

// Admin signup
router.post('/admin/signup', adminAuthController.signup);

// Admin login
router.post('/admin/login', adminAuthController.login);

module.exports = router;
