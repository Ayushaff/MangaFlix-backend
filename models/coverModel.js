const mongoose = require("mongoose");

const coverModelSchema = mongoose.Schema({
  id: {
    type: "String",
  },
  type: {
    type: "String",
  },
  attributes: {
    description: {
      type: "String",
    },
    volume: {
      type: "Date",
    },
    fileName: {
      type: "String",
    },
    locale: {
      type: "String",
    },
    createdAt: {
      type: "Date",
    },
    updatedAt: {
      type: "Date",
    },
    version: {
      type: "Number",
    },
  },
  relationships: {
    type: ["Mixed"],
  },
});

module.exports = mongoose.model("Cover", coverModelSchema);