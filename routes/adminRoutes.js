// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin endpoints
router.get('/admin/users', adminController.getAllUsers);
router.get('/admin/partners', adminController.getAllPartners);
router.get('/admin/salons', adminController.getAllSalons); // New route for fetching all salons

module.exports = router;
