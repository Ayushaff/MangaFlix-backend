//This file contains the model for the role
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Must be greater than 2'],
        enum: ['Community Admin', 'Community Moderator','Community User']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Role', RoleSchema);