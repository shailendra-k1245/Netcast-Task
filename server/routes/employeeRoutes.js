const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

router.post('/addEmployee', auth, upload.single('photo'), addEmployee);
router.get('/getEmployees', auth, getEmployees);
router.put('/updateEmployee/:id', auth, upload.single('photo'), updateEmployee);
router.delete('/deleteEmployee/:id', auth, deleteEmployee);

module.exports = router;
