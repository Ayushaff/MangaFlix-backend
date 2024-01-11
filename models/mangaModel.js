const mongoose = require("mongoose");
var URLSlug = require("mongoose-slug-generator");
mongoose.plugin(URLSlug);

const mangaModelSchema = mongoose.Schema({
  id: {
    type: "String",
  },
  mdex_id: {
    type: "String",
  },
  title: {
    en: {
      type: "String",
    },
  },
  altTitles: {
    type: ["Mixed"],
  },
  description: {
    en: {
      type: "String",
    },
  },
  isLocked: {
    type: "Boolean",
  },
  originalLanguage: {
    type: "String",
  },
  lastVolume: {
    type: "String",
  },
  lastChapter: {
    type: "String",
  },
  publicationDemographic: {
    type: "String",
  },
  status: {
    type: "String",
  },
  year: {
    type: "String",
  },
  contentRating: {
    type: "String",
  },
  genre: {
    type: ["String"],
  },
  author: {
    type: ["String"],
  },
  artist: {
    type: ["String"],
  },
  keywords: {
    type: "Array",
  },
  chapterNumbersResetOnNewVolume: {
    type: "Boolean",
  },
  createdAt: {
    type: "String",
  },
  updatedAt: {
    type: "String",
  },
  latestUploadedChapter: {
    type: "Array",
  },
  relationships: {
    type: "Array",
  },
  type: {
    type: "String",
  },
  views: {
    type: "Number",
  },
  rating: {
    type: "Number",
  },
  follows: {
    type: "Number",
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
    slug: "title.en",
  },
  postAt: {
    type: "String",
  },
});

module.exports = mongoose.model("Manga", mangaModelSchema);

/*
const mongoose = require('mongoose');
var URLSlug = require("mongoose-slug-generator");
const mangaModelSchemacopy=mongoose.Schema({
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

module.exports = mongoose.model("Manga", mangaModelSchemacopy);

*/
