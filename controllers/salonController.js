const Salon = require('../models/salon');
const { validationResult } = require('express-validator');

// Add a new salon
exports.addSalon = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, city, state, country, zipCode, ShopActLicense, gst , partnerEmail} = req.body;
        const partnerId = req.partner.id; // Assuming you have the partner ID from authentication
        

        // Process uploaded images
        const images = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/salon/${file.filename}`);

        const newSalon = await Salon.create({
            name,
            address,
            city,
            state,
            country,
            zipCode,
            ShopActLicense,
            gst,
            partnerId,
            partnerEmail, // Include partner's email in the creation
            images
        });

        res.json({ msg: 'Salon added successfully', salon: newSalon });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.editSalon = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salonId = req.params.id;
        const updatedFields = {};
        // Update only the fields that are present in the request body
        if (req.body.name) updatedFields.name = req.body.name;
        if (req.body.address) updatedFields.address = req.body.address;
        if (req.body.city) updatedFields.city = req.body.city;
        if (req.body.state) updatedFields.state = req.body.state;
        if (req.body.country) updatedFields.country = req.body.country;
        if (req.body.zipCode) updatedFields.zipCode = req.body.zipCode;

        const updatedSalon = await Salon.updateById(salonId, updatedFields);

        if (!updatedSalon) {
            return res.status(404).json({ msg: 'Salon not found or unauthorized' });
        }

        res.json({ msg: 'Salon updated successfully', salon: updatedSalon });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.getSalonByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const salon = await Salon.findByEmail(email);

        if (!salon) {
            return res.status(404).json({ msg: 'Salon not found' });
        }

        res.json({ salon });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllSalons = async (req, res) => {
    try {
        const salons = await Salon.getAllSalons();
        res.json(salons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};