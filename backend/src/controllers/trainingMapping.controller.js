const trainingMappingModel = require("../models/trainingMapping.model.js");
const employeeModel = require("../models/employee.model.js");
const trainingModel = require("../models/training.model.js");

async function getMappings(req, res) {
  try {
    const mappings = await trainingMappingModel
      .find()
      .populate("employee")
      .populate("training");

    return res.status(200).json(mappings);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching training mappings",
    });
  }
}

async function createMapping(req, res) {
  try {
    const { employee, training, progress, proficiency } = req.body;

    // Check whether employee exists
    const employeeExists = await employeeModel.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Check whether training exists
    const trainingExists = await trainingModel.findById(training);

    if (!trainingExists) {
      return res.status(404).json({
        message: "Training not found",
      });
    }

    // Check for duplicate assignment
    const existingMapping = await trainingMappingModel.findOne({
      employee,
      training,
    });

    if (existingMapping) {
      return res.status(409).json({
        message: "Employee is already assigned to this training",
      });
    }

    // Create mapping
    const mapping = await trainingMappingModel.create({
      employee,
      training,
      progress,
      proficiency,
    });

    return res.status(201).json(mapping);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating training mapping",
    });
  }
}

async function updateMapping(req, res) {
  try {
    const id = req.params.id;

    const { progress, proficiency } = req.body;

    const mapping = await trainingMappingModel.findByIdAndUpdate(
      id,
      {
        progress,
        proficiency,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!mapping) {
      return res.status(404).json({
        message: "Training mapping not found",
      });
    }

    return res.status(200).json(mapping.populate("employee").populate("training"));
  } catch (error) {
    return res.status(500).json({
      message: "Error updating training mapping",
    });
  }
}

async function deleteMapping(req, res) {
  try {
    const id = req.params.id;

    const mapping = await trainingMappingModel.findByIdAndDelete(id);

    if (!mapping) {
      return res.status(404).json({
        message: "Training mapping not found",
      });
    }

    return res.status(200).json({
      message: "Training mapping deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting training mapping",
    });
  }
}

module.exports = {
  getMappings,
  createMapping,
  updateMapping,
  deleteMapping
};
