// models/partner.js

const db = require('../config/db');

const Partner = {
    findOneByEmail: async function(email) {
        const [rows] = await db.execute('SELECT * FROM partners WHERE email = ?', [email]);
        return rows[0] || null;
    },

    create: async function({ fullName, email, phoneNumber, gender, password, role }) {
        await db.execute('INSERT INTO partners (fullName, email, phoneNumber, gender, password, role) VALUES (?, ?, ?, ?, ?, ?)', [fullName, email, phoneNumber, gender, password, role]);
    },

    findById: async function(id) {
        const [rows] = await db.execute('SELECT * FROM partners WHERE id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async function(id, { fullName, email, phoneNumber, gender }) {
        await db.execute('UPDATE partners SET fullName = ?, email = ?, phoneNumber = ?, gender = ? WHERE id = ?', [fullName, email, phoneNumber, gender, id]);
        return await this.findById(id); // Return the updated profile
    },

    deleteById: async function(id) {
        const [result] = await db.execute('DELETE FROM partners WHERE id = ?', [id]);
        return result.affectedRows > 0; // Check if any rows were affected (deleted)
    },

    getAllProfiles: async () => {
        try {
            const [partners] = await db.execute('SELECT * FROM partners');
            return partners;
        } catch (err) {
            console.error('Error fetching partner profiles:', err);
            throw new Error('Error fetching partner profiles');
        }
    },

    
};

module.exports = Partner;
