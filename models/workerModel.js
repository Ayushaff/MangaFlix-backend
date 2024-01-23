const mongoose = require('mongoose');

const workerModelSchema = new mongoose.Schema({
    workerUrl: { type: String, required: true },
    status: { type: Boolean, required: true },
    timesUsed: { type: Number, default: 0 },
    bytesUsed: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Worker', workerModelSchema);