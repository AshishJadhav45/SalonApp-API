// controllers/adminAuthController.js

const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const AdminAuthController = {
    signup: async function(req, res) {
        try {
            const { fullName, email, password } = req.body;
            const existingAdmin = await Admin.findByEmail(email);

            if (existingAdmin) {
                return res.status(400).json({ error: 'Admin with this email already exists' });
            }

            await Admin.create({ fullName, email, password });
            res.status(201).json({ message: 'Admin registered successfully' });
        } catch (err) {
            console.error('Error during admin signup:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async function(req, res) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findByEmail(email);

            if (!admin) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);

            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.json({ token });
        } catch (err) {
            console.error('Error during admin login:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = AdminAuthController;
