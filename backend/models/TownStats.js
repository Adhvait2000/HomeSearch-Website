const mongoose = require("mongoose");

const TownStatsSchema = new mongoose.Schema({
  districtNo: {
    type: String,
    required: [true, "Please add a dsitrict number"],
  },
  averagePricePvt: {
    type: Number,
    required: [
      true,
      "Please add an average price for private houses in this district number",
    ],
  },
  averagePricePublic: {
    type: Number,
    required: [
      true,
      "Please add an average price for public houses in this district number",
    ],
  },
  averagePriceAll: {
    type: Number,
    required: [
      true,
      "Please add an average price for both private and public houses in this district number",
    ],
  },
});

module.exports = mongoose.model("TownStats", TownStatsSchema);
