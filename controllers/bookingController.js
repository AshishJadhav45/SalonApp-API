// controllers/bookingController.js

const Booking = require('../models/booking');
const { validationResult } = require('express-validator');

// Get all customer bookings
exports.getAllBookings = async (req, res) => {
  try {
    const customerId = req.user.id; // Assuming user ID is stored in the request
    const bookings = await Booking.getAllBookingsByCustomerId(customerId);
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new booking
exports.addBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { salonId, serviceId, staffId, bookingDate, startTime, endTime, customerEmail } = req.body;

  try {
    const newBooking = await Booking.addBooking({
      salonId,
      serviceId,
      staffId,
      bookingDate,
      startTime,
      endTime,
      customerEmail,
    });

    res.json({ msg: 'Booking added successfully', booking: newBooking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// Update a booking by ID
// Update a customer booking
exports.updateBooking = async (req, res) => {
    const { id: bookingId } = req.params;
    const { bookingDate, startTime, endTime } = req.body;

    try {
        const updatedBooking = await Booking.updateBooking(bookingId, { bookingDate, startTime, endTime });
        if (!updatedBooking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        res.json({ msg: 'Booking updated successfully', booking: updatedBooking });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    await Booking.deleteBooking(id);
    res.json({ msg: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all salon bookings (for partners)
// controllers/bookingController.js

// Get all salon bookings (for partners)
exports.getSalonBookings = async (req, res) => {
    try {
        const partnerId = req.partner.id; // Assuming you have partner ID from authentication
        const bookings = await Booking.getBookingsByPartner(partnerId);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Update a salon booking by ID (for partners)

exports.confirmBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const updatedBooking = await Booking.confirmBooking(bookingId);
        res.json({ msg: 'Booking confirmed successfully', booking: updatedBooking });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Get booking status by ID for customers
exports.getBookingStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.json({ status: booking.status });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all booking statuses for partners
exports.getAllBookingStatuses = async (req, res) => {
  try {
    const partnerId = req.partner.id; // Assuming partner ID is stored in the request
    const bookings = await Booking.getAllBookingStatusesByPartner(partnerId);
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
