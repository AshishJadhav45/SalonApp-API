const db = require('../config/db');

const Service = {
    getAllServicesBySalonId: async function (salonId) {
        const [services] = await db.execute('SELECT * FROM services WHERE salonId = ?', [salonId]);
        return services;
    },

    addService: async function (salonId, { name, description, price }) {
        await db.execute('INSERT INTO services (salonId, name, description, price) VALUES (?, ?, ?, ?)', [salonId, name, description, price]);
    },

    updateService: async function (salonId, serviceId, { name, description, price }) {
        await db.execute('UPDATE services SET name = ?, description = ?, price = ? WHERE id = ? AND salonId = ?', [name, description, price, serviceId, salonId]);
    },

    deleteService: async function (salonId, serviceId) {
        await db.execute('DELETE FROM services WHERE id = ? AND salonId = ?', [serviceId, salonId]);
    }
};

module.exports = Service;
