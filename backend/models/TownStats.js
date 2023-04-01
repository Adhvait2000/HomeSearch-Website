const mongoose = require("mongoose");

const TownStatsSchema = new mongoose.Schema({
  districtNumber: {
    type: String,
    required: [true, "Please add a dsitrict number"],
  },
  averagePricePvt: {
    type: Number,
    required: [
      false,
      "Please add an average price for private houses in this district number",
    ],
  },
  averagePricePublic: {
    type: Number,
    required: [
      false,
      "Please add an average price for public houses in this district number",
    ],
  },
  averagePriceAll: {
    type: Number,
    required: [
      false,
      "Please add an average price for both private and public houses in this district number",
    ],
  },
  generalLocation: {
    type: [String],
    required: [true, "Please add a general location"],
    default: [],
  },
});

module.exports = mongoose.model("TownStats", TownStatsSchema);
