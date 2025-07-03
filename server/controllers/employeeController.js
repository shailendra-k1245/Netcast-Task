const employeeService = require('../services/employeeService');

const addEmployee = async (req, res) => {
  const photo = req.file?.filename || null;

  try {
    await employeeService.addEmployee(req.user.id, req.body, photo);
    res.status(201).json({ msg: 'Employee added' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to add employee', err: error });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees(req.user.id);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching employees', err: error });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const photo = req.file?.filename;

  try {
    await employeeService.updateEmployee(req.user.id, id, req.body, photo);
    res.json({ msg: 'Employee updated' });
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg || 'Update failed' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await employeeService.softDeleteEmployee(req.user.id, id);
    res.json({ msg: 'Employee soft-deleted' });
  } catch (error) {
    res.status(error.status || 500).json({ msg: error.msg || 'Soft delete failed' });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
