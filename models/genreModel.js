const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id : {type : String, required : true, unique: true},
  name: { type: String, required: true ,unique : true},
  description: { type: String, required: false },
  important: { type: Boolean, required: true },
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false },
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
