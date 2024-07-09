// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

// Validate request body for adding a new booking
const addBookingValidation = [
  body('salonId', 'Salon ID is required').notEmpty().isNumeric(),
  body('serviceId', 'Service ID is required').notEmpty().isNumeric(),
  body('customerEmail', 'Customer Email is required').notEmpty().isEmail(),
  body('bookingDate', 'Booking date is required').notEmpty().isISO8601(),
  body('startTime', 'Start time is required').notEmpty().isString(),
  body('endTime', 'End time is required').notEmpty().isString(),
];

const updateBookingValidation = [
    body('bookingDate').optional().isISO8601().toDate(),
    body('startTime').optional().isISO8601({ strict: true }).toDate(),
    body('endTime').optional().isISO8601({ strict: true }).toDate(),
];

// Protect routes below with authentication middleware
router.use(authMiddleware);


router.get('/bookings/:id/status', bookingController.getBookingStatus); // Get booking status by ID
router.get('/bookings/status', bookingController.getAllBookingStatuses); // Get all booking statuses for partner
// Customer booking routes
 // Get all customer bookings
router.put('/:id', updateBookingValidation, bookingController.updateBooking);

router.post('/bookings', addBookingValidation, bookingController.addBooking); // Add a new booking
router.put('/bookings/:id', bookingController.updateBooking); // Update a booking by ID
router.delete('/bookings/:id', bookingController.deleteBooking); // Delete a booking by ID


module.exports = router;
