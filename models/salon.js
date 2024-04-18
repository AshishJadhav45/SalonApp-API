const db = require('../config/db');

const Salon = {
    create: async function ({ name, address, city, state, country, zipCode, partnerId, salonImages }) {
        const [result] = await db.execute('INSERT INTO salons (name, address, city, state, country, zipCode, partnerId) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, address, city, state, country, zipCode, partnerId]);
        const newSalonId = result.insertId;
        await this.insertSalonImages(newSalonId, salonImages);
        const newSalon = await this.findById(newSalonId);
        return newSalon;
    },

    insertSalonImages: async function (salonId, salonImages) {
        if (salonImages && salonImages.length > 0) {
            const values = salonImages.map(img => `(${salonId}, '${img.type}', '${img.url}')`).join(',');
            await db.execute(`INSERT INTO salon_images (salonId, type, url) VALUES ${values}`);
        }
    },
    
    findById: async function (id) {
        const [rows] = await db.execute('SELECT * FROM salons WHERE id = ?', [id]);
        return rows[0] || null;
    },

    updateById: async function (id, updateFields) {
        const updateColumns = Object.keys(updateFields).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(updateFields);
        const query = `UPDATE salons SET ${updateColumns} WHERE id = ?`;
        updateValues.push(id);
        await db.execute(query, updateValues);
        const updatedSalon = await this.findById(id);
        return updatedSalon;
    },

    findAll: async function () {
        const [rows] = await db.execute('SELECT * FROM salons');
        return rows || [];
    }
};

module.exports = Salon;
