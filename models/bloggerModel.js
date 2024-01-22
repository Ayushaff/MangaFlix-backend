const mongoose = require('mongoose');

const bloggerSchema = new mongoose.Schema({

    id : {
        type : String,
        unique : true,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    post_url: {
        type: String,
        required: true,
    },
    cookie: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Blogger', bloggerSchema);