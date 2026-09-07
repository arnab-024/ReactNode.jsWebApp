const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department"
    },
    designation: {
        type: String,
        required: true
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'on-leave']
    },
    joiningDate: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    education: {
        type: String,
    },
    jpplExperience: {
        type: Number,
        min: 0,
        default: 0
    },
    totalExperience: {
        type: Number,
        min: 0,
        default: 0
    },
    managerFlag: {
        type: String,
        enum: ["N", "Y"],
        default: "N"
    }
});

const employeeModel = mongoose.model('employee', employeeSchema);

module.exports = employeeModel;