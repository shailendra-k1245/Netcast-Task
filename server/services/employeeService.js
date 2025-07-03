const queryAsync = require('../utils/queryAsync');
const fs = require('fs');
const path = require('path');

const addEmployee = async (userId, employeeData, photo) => {
  const { name, mobile, email, designation, city, state } = employeeData;
  const query = `
    INSERT INTO employees (user_id, photo, name, mobile, email, designation, city, state)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  await queryAsync(query, [userId, photo, name, mobile, email, designation, city, state]);
};

const getEmployees = async (userId) => {
  const query = 'SELECT * FROM employees WHERE user_id = ? AND deleted = FALSE';
  return await queryAsync(query, [userId]);
};

const updateEmployee = async (userId, employeeId, employeeData, photo) => {
  const checkQuery = 'SELECT * FROM employees WHERE id = ? AND user_id = ? AND deleted = FALSE';
  const results = await queryAsync(checkQuery, [employeeId, userId]);

  if (results.length === 0) {
    throw { status: 403, msg: 'Unauthorized or employee not found' };
  }

  const oldPhoto = results[0].photo;

  let updateQuery = `
    UPDATE employees SET
      name = ?, mobile = ?, email = ?, designation = ?, city = ?, state = ?`;
  const params = [
    employeeData.name,
    employeeData.mobile,
    employeeData.email,
    employeeData.designation,
    employeeData.city,
    employeeData.state
  ];

  if (photo) {
    updateQuery += ', photo = ?';
    params.push(photo);
  }

  updateQuery += ' WHERE id = ?';
  params.push(employeeId);

  await queryAsync(updateQuery, params);

  if (photo && oldPhoto) {
    const filePath = path.join(__dirname, '../uploads', oldPhoto);
    fs.unlink(filePath, () => {});
  }
};

const softDeleteEmployee = async (userId, employeeId) => {
  const checkQuery = 'SELECT * FROM employees WHERE id = ? AND user_id = ? AND deleted = FALSE';
  const results = await queryAsync(checkQuery, [employeeId, userId]);

  if (results.length === 0) {
    throw { status: 403, msg: 'Unauthorized or already deleted' };
  }

  await queryAsync('UPDATE employees SET deleted = TRUE WHERE id = ?', [employeeId]);
};

module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  softDeleteEmployee,
};
