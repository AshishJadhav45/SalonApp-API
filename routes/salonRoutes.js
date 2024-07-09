const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const salonController = require('../controllers/salonController');
const authMiddleware = require('../middleware/authMiddleware');

// Validate request body for adding a new salon
const salonValidation = [
    body('name', 'Name is required').notEmpty(),
    body('address', 'Address is required').notEmpty(),
    body('city', 'City is required').notEmpty(),
    body('state', 'State is required').notEmpty(),
    body('country', 'Country is required').notEmpty(),
    body('zipCode', 'Zip code is required').notEmpty(),
    body('ShopActLicense', 'Shop Act License is required').notEmpty(),
    body('gst', 'GST number is required').notEmpty(),
    body('partnerEmail', 'Partner email is required').isEmail(), // Validate partner's email
];


const editSalonValidation = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('address').optional().notEmpty().withMessage('Address is required'),
    body('city').optional().notEmpty().withMessage('City is required'),
    body('state').optional().notEmpty().withMessage('State is required'),
    body('country').optional().notEmpty().withMessage('Country is required'),
    body('zipCode').optional().notEmpty().withMessage('Zip code is required')
];

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/salon'); // Specify the directory where files should be uploaded
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});
const upload = multer({ storage: storage });






// Add a new salon
router.post('/add', authMiddleware, upload.array('images', 8), salonValidation, salonController.addSalon);
router.put('/:id/edit', editSalonValidation, salonController.editSalon);

router.get('/email/:email', salonController.getSalonByEmail);








module.exports = router;
