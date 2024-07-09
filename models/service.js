// models/service.js

const db = require('../config/db');

const Service = {
    getAllServicesBySalonId: async function (salonId) {
        const [services] = await db.execute('SELECT * FROM services WHERE salonId = ?', [salonId]);
        return services;
    },

    getAllServices: async function () {
        const [services] = await db.execute('SELECT * FROM services');
        return services;
    },

    getServiceById: async function (salonId, serviceId) {
        const [service] = await db.execute('SELECT * FROM services WHERE id = ? AND salonId = ?', [serviceId, salonId]);
        return service[0] || null;
    },

    addService: async function (salonId, { name, description, price }) {
        await db.execute('INSERT INTO services (salonId, name, description, price) VALUES (?, ?, ?, ?)', [salonId, name, description, price]);
    },

    updateService: async function (salonId, serviceId, { name, description, price }) {
        // Check which fields are provided and build the query accordingly
        let updateQuery = 'UPDATE services SET';
        const params = [];
        if (name) {
            updateQuery += ' name = ?,';
            params.push(name);
        }
        if (description) {
            updateQuery += ' description = ?,';
            params.push(description);
        }
        if (price !== undefined) {
            updateQuery += ' price = ?,';
            params.push(price);
        }
        // Remove the trailing comma
        updateQuery = updateQuery.slice(0, -1);
        updateQuery += ' WHERE id = ? AND salonId = ?';
        params.push(serviceId, salonId);

        await db.execute(updateQuery, params);
    },

    deleteService: async function (salonId, serviceId) {
        await db.execute('DELETE FROM services WHERE id = ? AND salonId = ?', [serviceId, salonId]);
    }
};

module.exports = Service;
