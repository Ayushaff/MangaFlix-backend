const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");


const pageSchema = new mongoose.Schema({
  server1: { type: [String] },
  server2: { type: [String] },
});

const relationshipSchema = new mongoose.Schema({
  user_id: { type: String },
  method: { type: String },
  from: { type: String },
});

const chapterModelSchema = new mongoose.Schema({
  mangaId: { type: String },
  chapterId: { type: String },
  title: { type: String },
  volume: { type: Number },
  chapterNumber: { type: String },
  summary: { type: String },
  language: { type: String },
  pages: {
    server1: { type: [String] },
    server2: { type: [String] },
  },
  pageCount: { type: Number },
  version: { type: Number },
  publishedAt: { type: Date },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  isActive: { type: Boolean },
  relationships: [relationshipSchema],
});

module.exports = mongoose.model("Chapter", chapterModelSchema);
