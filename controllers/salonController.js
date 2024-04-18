const Salon = require('../models/salon');
const { validationResult } = require('express-validator');

// Add a new salon
exports.addSalon = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, city, state, country, zipCode, salonImage } = req.body;
        const partnerId = req.partner.id; // Assuming you have the partner ID from authentication

        const salonImages = [];
        if (salonImage) {
            salonImages.push({ type: 'salonImage', url: salonImage });
        }

        const newSalon = await Salon.create({ name, address, city, state, country, zipCode, partnerId, salonImages });

        res.json({ msg: 'Salon added successfully', salon: newSalon });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update salon details
exports.editSalon = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updateFields = {};
        const { name, address, city, state, country, zipCode } = req.body;
        if (name) updateFields.name = name;
        if (address) updateFields.address = address;
        if (city) updateFields.city = city;
        if (state) updateFields.state = state;
        if (country) updateFields.country = country;
        if (zipCode) updateFields.zipCode = zipCode;

        const salonId = req.params.id;
        const partnerId = req.partner.id; // Assuming you have the partner ID from authentication

        const updatedSalon = await Salon.updateById(salonId, updateFields);

        if (!updatedSalon) {
            return res.status(404).json({ msg: 'Salon not found or unauthorized' });
        }

        res.json({ msg: 'Salon updated successfully', salon: updatedSalon });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Fetch salon details by ID
exports.getSalonById = async (req, res) => {
    try {
        const salonId = req.params.id;
        const salon = await Salon.findById(salonId);

        if (!salon) {
            return res.status(404).json({ msg: 'Salon not found' });
        }

        res.json({ salon });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
