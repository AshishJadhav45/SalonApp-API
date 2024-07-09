// models/booking.js

const db = require('../config/db');

const Booking = {

 

  addBooking: async function ({ salonId, serviceId, staffId, bookingDate, startTime, endTime, customerEmail }) {
    await db.execute(
      'INSERT INTO bookings (salonId, serviceId, staffId, bookingDate, startTime, endTime, customerEmail) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [salonId, serviceId, staffId, bookingDate, startTime, endTime, customerEmail]
    );
    return { salonId, serviceId, staffId, bookingDate, startTime, endTime, customerEmail };
  },
  // Update other model methods to handle customerEmail as necessary..
  confirmBooking: async function (bookingId) {
    await db.execute('UPDATE bookings SET status = "confirmed" WHERE id = ?', [bookingId]);
    const [booking] = await db.execute('SELECT * FROM bookings WHERE id = ?', [bookingId]);
    return booking[0];
},

updateBooking: async function (bookingId, { bookingDate, startTime, endTime }) {
    try {
        let updateQuery = 'UPDATE bookings SET';
        const params = [];

        if (bookingDate) {
            updateQuery += ' bookingDate = ?,';
            params.push(bookingDate);
        }
        if (startTime) {
            updateQuery += ' startTime = ?,';
            params.push(startTime);
        }
        if (endTime) {
            updateQuery += ' endTime = ?,';
            params.push(endTime);
        }

        // Remove the trailing comma
        updateQuery = updateQuery.slice(0, -1);
        updateQuery += ' WHERE id = ?';

        params.push(bookingId);

        // Execute the update query
        const [result] = await db.execute(updateQuery, params);

        // Check if any rows were affected by the update
        if (result.affectedRows > 0) {
            // Fetch and return the updated booking
            const [booking] = await db.execute('SELECT * FROM bookings WHERE id = ?', [bookingId]);
            return booking[0];
        }
        return null; // No booking found or unauthorized update
    } catch (err) {
        throw new Error(err.message);
    }
},
  getBookingsByPartner: async function (partnerId) {
    const query = `
        SELECT b.* 
        FROM bookings b
        JOIN services s ON b.serviceId = s.id
        JOIN salons sl ON s.salonId = sl.id
        JOIN partners p ON sl.partnerId = p.id
        WHERE p.id = ?`;
    const [bookings] = await db.execute(query, [partnerId]);
    return bookings;
},

getAllBookingStatusesByPartner: async function (partnerId) {
  const query = `
    SELECT b.id, b.status 
    FROM bookings b
    JOIN services s ON b.serviceId = s.id
    JOIN salons sl ON s.salonId = sl.id
    JOIN partners p ON sl.partnerId = p.id
    WHERE p.id = ?`;
  const [statuses] = await db.execute(query, [partnerId]);
  return statuses;
},

getBookingById: async function (id) {
  const [booking] = await db.execute('SELECT * FROM bookings WHERE id = ?', [id]);
  return booking[0];
},


// Update booking by partner

  deleteBooking: async function (bookingId) {
    await db.execute('DELETE FROM bookings WHERE id = ?', [bookingId]);
  },

  
};

module.exports = Booking;
