const db = require('../config/db');

const Staff = {
  addStaff: async function (salonId, name, position) {
    const [result] = await db.execute('INSERT INTO staff (salonId, name, position) VALUES (?, ?, ?)', [salonId, name, position]);
    return result.insertId;
  },

  updateStaff: async function (id, name, position) {
    await db.execute('UPDATE staff SET name = ?, position = ? WHERE id = ?', [name, position, id]);
  },

  deleteStaff: async function (id) {
    await db.execute('DELETE FROM staff WHERE id = ?', [id]);
  },

  getAllBySalonId: async function (salonId) {
    const [staff] = await db.execute('SELECT * FROM staff WHERE salonId = ?', [salonId]);
    return staff;
  },
};

module.exports = Staff;
