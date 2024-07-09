// controllers/serviceController.js

const Service = require('../models/service');
const { validationResult } = require('express-validator');

// Get all services of a salon
exports.getAllServices = async (req, res) => {
    try {
        const salonId = req.params.id;
        const services = await Service.getAllServicesBySalonId(salonId);
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add a new service for a salon
exports.addService = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price } = req.body;
    const salonId = req.params.id;

    try {
        await Service.addService(salonId, { name, description, price });
        res.json({ msg: 'Service added successfully' });    
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update a service of a salon
exports.updateService = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price } = req.body;
    const { id: salonId, serviceId } = req.params;

    try {
        await Service.updateService(salonId, serviceId, { name, description, price });
        res.json({ msg: 'Service updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a service of a salon
exports.deleteService = async (req, res) => {
    const { id: salonId, serviceId } = req.params;
    try {
        await Service.deleteService(salonId, serviceId);
        res.json({ msg: 'Service deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.getAllServices();
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};