// controllers/adminController.js

const User = require('../models/user');
const Partner = require('../models/partner');
const Salon = require('../models/salon');


const AdminController = {
  getAllUsers: async function(req, res) {
    try {
      const customers = await User.getAllProfiles();
      const partners = await Partner.getAllProfiles();

      // Combine and return all users
      const allUsers = {
        customers: customers,
        partners: partners
      };

      res.json(allUsers);
    } catch (err) {
      console.error('Error fetching all users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllPartners: async function(req, res) {
    try {
      const partners = await Partner.getAllProfiles();
      res.json(partners);
    } catch (err) {
      console.error('Error fetching all partner profiles:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAllSalons: async function(req, res) {
    try {
        const salons = await Salon.getAllSalons();
        res.json(salons);
    } catch (err) {
        console.error('Error fetching all salons:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
};

module.exports = AdminController;
