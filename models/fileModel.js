const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalname: String,
  mimetype: String,
  size: Number,
  buffer: Buffer,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
