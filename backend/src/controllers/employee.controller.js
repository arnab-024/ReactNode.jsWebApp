const employeeModel = require("../models/employee.model.js");

async function getAllEmployees(req, res) {
  try {
    const employees = await employeeModel
      .find()
      .populate("department", "name")
      .populate("manager");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching employees",
      error: error.message,
    });
  }
}

async function createEmployee(req, res) {
  try {
    const {
      name,
      designation,
      manager,
      department,
      status,
      joiningDate,
      rating,
      education,
      jpplExperience,
      totalExperience,
      managerFlag
    } = req.body;

    const lastEmployee = await employeeModel.findOne().sort({ employeeId: -1 });

    let employeeNumber;

    if (!lastEmployee) {
      employeeNumber = 1001; //Starting number if no employees exist
    } else {
      employeeNumber = parseInt(lastEmployee.employeeId.split("-")[1]) + 1;
    }

    const employeeId = `PX-${employeeNumber}`;

    const email = `${employeeId.toLowerCase()}@polymerx.com`;

    const employee = await employeeModel.create({
      employeeId,
      email,
      name,
      designation,
      manager: manager || null,
      department,
      status,
      joiningDate,
      rating,
      education,
      jpplExperience,
      totalExperience,
      managerFlag
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
}

async function updateEmployee(req, res) {
  try {
    const id = req.params.id;

    const {
      name,
      designation,
      manager,
      department,
      status,
      joiningDate,
      rating,
      jpplExperience,
      totalExperience,
      managerFlag
    } = req.body;

    const employee = await employeeModel.findByIdAndUpdate(
      id,
      {
        name,
        designation,
        manager: manager || null,
        department,
        status,
        joiningDate,
        rating,
        jpplExperience,
        totalExperience,
        managerFlag
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Update Employee Error: ", error);
    res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
}

async function getEmployeeById(req, res) {
  try {
    const id = req.params.id;
    const employee = await employeeModel
      .findById(id)
      .populate("department")
      .populate("manager");
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    } else {
      return res.status(200).json(employee);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching employee",
    });
  }
}

async function deleteEmployee(req, res) {
  try {
    const id = req.params.id;

    const employee = await employeeModel.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting employee",
    });
  }
}

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
