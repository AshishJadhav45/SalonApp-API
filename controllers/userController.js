// controllers/userController.js

const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.getAllProfiles = async (req, res) => {
    try {
        // Fetch all user profiles from the database
        const [profiles] = await pool.query('SELECT * FROM users');
        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Register a new customer account
exports.signup = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract user details from request body
    const { fullName, email, phoneNumber, gender, password } = req.body;

    try {
        // Check if user already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Insert new user into the database with plain text password
        await pool.query('INSERT INTO users (fullName, email, phoneNumber, gender, password) VALUES (?, ?, ?, ?, ?)', [fullName, email, phoneNumber, gender, password]);

        res.json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Authenticate a customer
exports.login = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from request body
    const { email, password } = req.body;

    try {
        // Retrieve user from the database
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Validate password (since stored as plain text)
        if (password !== user[0].password) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Generate and return JWT token
        const payload = {
            user: {
                id: user[0].id
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

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   

    // Extract user details from request body
    const { fullName, email, phoneNumber, gender } = req.body;

    // Check if any required fields are missing
    if (!fullName || !email || !phoneNumber || !gender) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const userId = req.user.id;

        // Update user profile in the database
        await pool.query('UPDATE users SET fullName = ?, email = ?, phoneNumber = ?, gender = ? WHERE id = ?', [fullName, email, phoneNumber, gender, userId]);

        res.json({ msg: 'Profile updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Delete user profile from the database
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);

        res.json({ msg: 'Profile deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
