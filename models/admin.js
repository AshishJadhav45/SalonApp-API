// models/admin.js

const db = require('../config/db');
const bcrypt = require('bcrypt');

const Admin = {
    create: async function(adminData) {
        const { fullName, email, password } = adminData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO admins (fullName, email, password) VALUES (?, ?, ?)',
            [fullName, email, hashedPassword]
        );

        return result;
    },

    findByEmail: async function(email) {
        const [rows] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);
        return rows[0];
    }
};

module.exports = Admin;
