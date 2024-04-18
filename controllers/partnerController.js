// controllers/partnerController.js

const Partner = require('../models/partner');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, phoneNumber, gender, password, role } = req.body;

        let partner = await Partner.findOneByEmail(email);
        if (partner) {
            return res.status(400).json({ msg: 'Partner already exists' });
        }

        await Partner.create({ fullName, email, phoneNumber, gender, password, role });

        res.json({ msg: 'Partner registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Authenticate a partner
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        let partner = await Partner.findOneByEmail(email);
        if (!partner) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Assuming password is stored as plain text in the database
        if (password !== partner.password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            partner: {
                id: partner.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ msg: 'Login successful', token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get partner profile
exports.getProfile = async (req, res) => {
    try {
        // Retrieve partner profile from the database
        // Implement logic to fetch partner profile based on partner ID
        const partner = await Partner.findById(req.partner.id);

        if (!partner) {
            return res.status(404).json({ msg: 'Partner profile not found' });
        }

        res.json(partner); // Send partner profile in response
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update partner profile
exports.updateProfile = async (req, res) => {
    try {
        // Extract updated profile data from request body
        const { fullName, email, phoneNumber, gender } = req.body;

        // Update partner profile in the database
        // Implement logic to update partner profile based on partner ID
        const updatedProfile = await Partner.updateById(req.partner.id, { fullName, email, phoneNumber, gender });

        if (!updatedProfile) {
            return res.status(404).json({ msg: 'Partner profile not found' });
        }

        res.json({ msg: 'Partner profile updated successfully', profile: updatedProfile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const partners = await Partner.getAllProfiles();
        res.json(partners);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Delete partner profile
exports.deleteProfile = async (req, res) => {
    try {
        // Extract partner ID from the request
        const partnerId = req.partner.id;

        // Delete partner profile from the database
        const deletedProfile = await Partner.deleteById(partnerId);

        // Check if the partner profile was not found
        if (!deletedProfile) {
            return res.status(404).json({ msg: 'Partner profile not found' });
        }

        // Respond with success message
        res.json({ msg: 'Partner profile deleted successfully' });
    } catch (err) {
        console.error('Error deleting partner profile:', err);
        res.status(500).send('Server Error');
    }
};


