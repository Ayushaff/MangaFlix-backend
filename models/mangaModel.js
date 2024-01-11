const mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");
const mangaModelSchema=mongoose.Schema({
  "id": {
    "type": "String"
  },
  "mdex_id": {
    "type": "String"
  },
  "title": {
    "en": {
      "type": "String"
    }
  },
  "altTitles": {
    "type": [
      "Mixed"
    ]
  },
  "description": {
    "en": {
      "type": "String"
    }
  },
  "isLocked": {
    "type": "Boolean"
  },
  "originalLanguage": {
    "type": "String"
  },
  "lastVolume": {
    "type": "String"
  },
  "lastChapter": {
    "type": "String"
  },
  "publicationDemographic": {
    "type": "String"
  },
  "status": {
    "type": "String"
  },
  "year": {
    "type": "String"
  },
  "contentRating": {
    "type": "String"
  },
  "genre": {
    "type": [
      "String"
    ]
  },
  "author": {
    "type": [
      "String"
    ]
  },
  "artist": {
    "type": [
      "String"
    ]
  },
  "keywords": {
    "type": "Array"
  },
  "chapterNumbersResetOnNewVolume": {
    "type": "Boolean"
  },
  "createdAt": {
    "type": "String"
  },
  "updatedAt": {
    "type": "String"
  },
  "latestUploadedChapter": {
    "type": "Array"
  },
  "relationships": {
    "type": "Array"
  },
  "type": {
    "type": "String"
  },
  "views": {
    "type": "Number"
  },
  "rating": {
    "type": "Number"
  },
  "follows": {
    "type": "Number"
  },
  "poster": {
    "original": {
      "type": "String"
    },
    "thumb": {
      "type": "String"
    },
  },
  "Slug": {
    "type": "String"
  },
  "postAt" :{
    "type":"String"
  }
});

module.exports = mongoose.model("Manga", mangaModelSchema);