const mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");
const mangaModelSchema=mongoose.Schema({
    "id": {
      "type": "String"
    },
    "type": {
      "type": "String"
    },
    "attributes": {
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
      "description": {},
      "isLocked": {
        "type": "Boolean"
      },
      "links": {
        "mu": {
          "type": "Date"
        },
        "raw": {
          "type": "Date"
        }
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
        "type": "Number"
      },
      "contentRating": {
        "type": "String"
      },
      "tags": {
        "type": [
          "Mixed"
        ]
      },
      "state": {
        "type": "String"
      },
      "chapterNumbersResetOnNewVolume": {
        "type": "Boolean"
      },
      "createdAt": {
        "type": "Date"
      },
      "updatedAt": {
        "type": "Date"
      },
      "version": {
        "type": "Number"
      },
      "availableTranslatedLanguages": {
        "type": [
          "String"
        ]
      },
      "latestUploadedChapter": {
        "type": "String"
      }
    },
    "relationships": {
      "type": [
        "Mixed"
      ]
    }
  });

module.exports = mongoose.model("Manga", mangaModelSchema);