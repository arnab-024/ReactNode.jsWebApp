const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    trainingId: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'draft'],
        required: true
    },

    description: {
        type: String,
        default: ''
    }
});

const trainingModel = mongoose.model('training', trainingSchema);

module.exports = trainingModel;