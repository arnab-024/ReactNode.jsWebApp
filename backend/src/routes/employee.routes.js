const express = require('express');
const employeeController = require('../controllers/employee.controller.js');

const router = express.Router();

router.get('/', employeeController.getAllEmployees);
router.post('/createEmployee', employeeController.createEmployee);
router.put('/updateEmployee/:id', employeeController.updateEmployee);
router.get('/employee/:id', employeeController.getEmployeeById);
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);

module.exports = router;