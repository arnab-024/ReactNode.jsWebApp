const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

const employeeRoutes = require('./routes/employee.routes.js');
const departmentRoutes = require('./routes/department.routes.js');
const trainingRoutes = require('./routes/training.routes.js');
const trainingMappingRoutes = require('./routes/trainingMapping.routes.js');

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes and to allow requests from any origin
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/training-mappings", trainingMappingRoutes);

module.exports = app;