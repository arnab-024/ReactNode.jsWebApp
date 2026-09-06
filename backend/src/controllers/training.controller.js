const mongoose = require('mongoose');
const trainingModel = require('../models/training.model.js');

async function getTrainings(req, res) {
    try {
        const trainings = await trainingModel.find();
        return res.status(200).json(trainings);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching training courses"
        });
    }
}

async function createTraining(req, res) {
    try {
        const {title, category, duration, status, description} = req.body;

        const lastTraining = await trainingModel.findOne().sort({trainingId: -1});
        let trainingNumber;

        if(!lastTraining) {
            trainingNumber = 100;
        } else {
            const lastNumber = parseInt(lastTraining.trainingId.split("-")[1]);
            trainingNumber = lastNumber + 1;
        }
        const trainingId = `TRN-${trainingNumber}`;
        const training = await trainingModel.create({
            trainingId,
            title,
            category,
            duration,
            status,
            description
        });
        return res.status(201).json(training);
    } catch (error) {
        return res.status(500).json({
            message: "Error creating training course"
        });
    }
}

async function getTrainingById(req, res) {
    try {
        const id = req.params.id;

        const training = await trainingModel.findById(id);

        if (!training) {
            return res.status(404).json({
                message: "Training not found"
            });
        }

        return res.status(200).json(training);

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching training"
        });
    }
}

async function updateTraining(req, res) {
    try {
        const id = req.params.id;

        const { title, category, duration, status, description } = req.body;

        const training = await trainingModel.findByIdAndUpdate(
            id,
            {
                title,
                category,
                duration,
                status,
                description
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!training) {
            return res.status(404).json({
                message: "Training not found"
            });
        }

        return res.status(200).json(training);

    } catch (error) {
        return res.status(500).json({
            message: "Error updating training"
        });
    }
}

async function deleteTraining(req, res) {
    try {
        const id = req.params.id;

        const training = await trainingModel.findByIdAndDelete(id);

        if (!training) {
            return res.status(404).json({
                message: "Training not found"
            });
        }

        return res.status(200).json({
            message: "Training deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error deleting training"
        });
    }
}

module.exports = {
    getTrainings,
    createTraining,
    getTrainingById,
    updateTraining,
    deleteTraining
};