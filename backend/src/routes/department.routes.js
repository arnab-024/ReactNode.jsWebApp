const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller.js');

router.get("/", departmentController.getAllDepartments);
router.post("/createDepartment", departmentController.createDepartment);
router.put('/updateDepartment/:id', departmentController.updateDepartment);
router.delete('/deleteDepartment/:id', departmentController.deleteDepartment);
module.exports = router;