const mongoose = require('mongoose');

const trainingMappingSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    },

    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'training',
        required: true
    },

    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    proficiency: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    }
});

// Prevent the same employee from being assigned
// to the same training course more than once.
trainingMappingSchema.index(
    { employee: 1, training: 1 },
    { unique: true }
);

const trainingMappingModel = mongoose.model(
    'trainingMapping',
    trainingMappingSchema
);

module.exports = trainingMappingModel;