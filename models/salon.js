const db = require('../config/db');

const Salon = {
    create: async function ({ name, address, city, state, country, zipCode, ShopActLicense, gst, partnerId, partnerEmail, images }) {
        const [result] = await db.execute(
            'INSERT INTO salons (name, address, city, state, country, zipCode, ShopActLicense, gst, partnerId, partnerEmail, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, address, city, state, country, zipCode, ShopActLicense, gst, partnerId, partnerEmail, JSON.stringify(images)]
        );
        const newSalonId = result.insertId;
        // const newSalon = await this.findById(newSalonId);
        // return newSalon;
    },

   findByEmail: async function (email) {
        const [rows] = await db.execute('SELECT * FROM salons WHERE partnerEmail = ?', [email]);
        return rows[0] || null;
    },
    getAllSalons: async function () {
        const [salons] = await db.execute('SELECT * FROM salons');
        return salons;
    },

    updateById: async function (salonId, updatedFields) {
        try {
            let updateQuery = 'UPDATE salons SET ';
            const params = [];
            for (const key in updatedFields) {
                if (updatedFields.hasOwnProperty(key)) {
                    updateQuery += `${key} = ?, `;
                    params.push(updatedFields[key]);
                }
            }
            // Remove the last comma and space from the query
            updateQuery = updateQuery.slice(0, -2);
            // Add the salon ID to the parameters array
            params.push(salonId);

            // Execute the update query
            const [result] = await db.execute(updateQuery + ' WHERE id = ?', params);

            // Check if any rows were affected by the update
            if (result.affectedRows > 0) {
                // Fetch and return the updated salon
                const [salon] = await db.execute('SELECT * FROM salons WHERE id = ?', [salonId]);
                return salon[0];
            }
            return null; // No salon found or unauthorized update
        } catch (err) {
            throw new Error(err.message);
        }
    },

   
   

   
};

module.exports = Salon;
