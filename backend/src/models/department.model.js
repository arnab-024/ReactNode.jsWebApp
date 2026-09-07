const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hod: {
    type: String,
    //ref: "employees",
    required: true
  },
  budget: {
    type: Number,
    required: true,
    min: [10, "Minimum budget should be Rs-10 Lakhs"],
  },

  description: {
    type: String,
  },
});

const departmentModel = mongoose.model("department", departmentSchema);

module.exports = departmentModel;
