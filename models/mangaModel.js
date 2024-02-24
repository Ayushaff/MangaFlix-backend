const mongoose = require("mongoose");

const mangaModelSchema = mongoose.Schema({
  id: {
    type: "String",
    unique : true,
    required : true,
  },
  mdex_id: {
    type: "String",
  },
  state : {
    type : "String",
    required : true,
  },
  badge : {
    type : "String",
    required : true,
  },
  title: {
    en: {
      type: "String",
      unique : true,
      required : true,
    },
  },
  altTitles: {
    type: ["Mixed"],
    required : true,
  },
  description: {
    en: {
      type: "String",
      required : true,
    },
  },
  isLocked: {
    type: "Boolean",
    
  },
  originalLanguage: {
    type: "String",
    required : true,
  },
  lastVolume: {
    type: "String",
    required : true,
  },
  lastChapter: {
    type: "String",
    required : true,
  },
  publicationDemographic: {
    type: "String",
    required : true,
  },
  status: {
    type: "String",
    required : true,
  },
  year: {
    type: "String",
    required : true,
  },
  contentRating: {
    type: "String",
    required : true,
  },
  genre: {
    type: ["String"],
    required : true,
  },
  author: {
    type: ["String"],
    required : true,
  },
  artist: {
    type: ["String"],
    required : true,
  },
  keywords: {
    type: ["String"],
    required : true,
  },
  chapterNumbersResetOnNewVolume: {
    type: "Boolean",
    required : true,
  },
  createdAt: {
    type: "String",
    required : true,
  },
  updatedAt: {
    type: "String",
    required : true,
  },
  latestUploadedChapter: {
    type: "String",
    required : true,
  },
  relationships: {
    type: "Array",
  },
  type: {
    type: "String",
    required : true,
  },
  views: {
    type: "Number",
    required : true,
  },
  rating: {
    type: "Number",
    required : true,
  },
  follows: {
    type: "Number",
    required : true,
  },
  poster: {
    original: {
      type: "String",
    },
    thumb: {
      type: "String",
    },
  },
  slug: {
    type: String,
  },
  postAt: {
    type: "String",
    required : true,
  },
});

module.exports = mongoose.model("Manga", mangaModelSchema);