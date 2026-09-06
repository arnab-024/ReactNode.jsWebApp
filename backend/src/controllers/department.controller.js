const mongoose = require('mongoose');
const departmentModel = require('../models/department.model.js');

async function getAllDepartments(req, res) {
    try {
        const departments = await departmentModel.find();
        return res.status(200).json(departments);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching departments"
        });
    }
}

async function createDepartment(req, res) {
    try {
        const {name, hod, budget, description} = req.body;

        const lastDepartment = await departmentModel.findOne().sort({departmentId: -1});
        let departmentNumber;
        
        if(!lastDepartment) {
            departmentNumber = 1;
        } else {
            const lastNumber = parseInt(lastDepartment.departmentId.split("-")[1]);
            departmentNumber = lastNumber + 1;
        }

        const departmentId = `DPT-${String(departmentNumber).padStart(3, "0")}`;
        const department = await departmentModel.create({
            departmentId,
            name,
            hod,
            budget,
            description
        });
        return res.status(201).json(department);
    } catch (error) {
        return res.status(500).json({
            message: "Error creating department"
        });
    }
}

async function updateDepartment(req, res) {
    try {
        const {name, hod, budget, description} = req.body;
        const id = req.params.id;
        const department = await departmentModel.findByIdAndUpdate(
            id,
            {name, hod, budget, description},
            {
                returnDocument: "after", //return the document after update, new: true is depreciated
                runValidators: true
            }
        );
        
        if(!department) {
            return res.status(404).json({
                message: "Department not found"
            });
        }
        return res.status(200).json(department);
    } catch (error) {
        return res.status(500).json({
            message: "Error updating department"
        });
    }
}

async function deleteDepartment(req, res) {
    try {
        const id = req.params.id;
        const department = await departmentModel.findByIdAndDelete(id);

        if(!department) {
            return res.status(404).json({
                message: "Department not found"
            });
        }
        return res.status(200).json({
            message: "Department deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting department"
        });
    }
}

module.exports = {
    getAllDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
};