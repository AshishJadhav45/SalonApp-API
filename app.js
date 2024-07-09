const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandlers');
const authMiddleware = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const salonRoutes = require('./routes/salonRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const staffRoutes = require('./routes/staffRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');



dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Routes


app.use('/api/customer', userRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/partner/salon', salonRoutes);
app.use('/api/partner/salon', serviceRoutes)
app.use('/api/partner/salon', staffRoutes);
app.use('/api/salon', salonRoutes);
app.use('/api', userRoutes);
app.use('/api/customer', bookingRoutes);
app.use('/api/partner', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/customer', authMiddleware, bookingRoutes);

app.use('/api/partners', authMiddleware, bookingRoutes);
app.use('/api', adminRoutes);
app.use('/api', adminAuthRoutes);



// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
