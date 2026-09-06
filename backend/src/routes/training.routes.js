const express = require('express');
const router = express.Router();
const trainingController = require("../controllers/training.controller.js");

router.get('/', trainingController.getTrainings);
router.post('/createTraining', trainingController.createTraining);
router.get('/:id', trainingController.getTrainingById);
router.put('/updateTraining/:id', trainingController.updateTraining);
router.delete('/deleteTraining/:id', trainingController.deleteTraining);
module.exports = router;