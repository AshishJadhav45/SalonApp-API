// models/user.js

const pool = require('../config/db');

// User model
const User = {};


User.getAllProfiles = async () => {
    try {
        const [profiles] = await pool.query('SELECT * FROM users');
        return profiles;
    } catch (error) {
        console.error('Error fetching user profiles:', error);
        throw new Error('Error fetching user profiles');
    }
};

// Function to create a new user
User.create = async ({ fullName, email, phoneNumber, gender, password }) => {
    try {
        // Insert new user into the database
        await pool.query('INSERT INTO users (fullName, email, phoneNumber, gender, password) VALUES (?, ?, ?, ?, ?)', [fullName, email, phoneNumber, gender, password]);
        return { success: true };
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
};

// Function to find a user by email
User.findByEmail = async (email) => {
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return user[0]; // Return the first user found
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Error finding user by email');
    }
};

// Function to find a user by ID
User.findById = async (id) => {
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return user[0]; // Return the first user found
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw new Error('Error finding user by ID');
    }
};

// Function to update a user by ID
User.findByIdAndUpdate = async (id, { fullName, email, phoneNumber, gender }) => {
    try {
        await pool.query('UPDATE users SET fullName = ?, email = ?, phoneNumber = ?, gender = ? WHERE id = ?', [fullName, email, phoneNumber, gender, id]);
        return { success: true };
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
    }
};

// Function to delete a user by ID
User.findByIdAndRemove = async (id) => {
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
};

module.exports = User;
