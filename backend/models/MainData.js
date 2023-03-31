const mongoose = require("mongoose");

const MainDataSchema = new mongoose.Schema({
  statusBuyRent: {
    type: String,
    required: [true, "Please provide status if property is for Buy or Rent"],
  },
  propertyPrivatePublic: {
    type: String,
    required: [
      true,
      "Please provide if property belongs to the Private or Public category",
    ],
  },
  districtNo: {
    type: String,
    required: [true, "Please add a district number"],
  },
  propertyType: {
    type: String,
    required: [
      false, // dataset for Pvt Non-Landed Resi Property does not have a value for propertyType
      "Please provide a property type",
    ],
  },
  propertyPrice: {
    type: Number,
    required: [
      false, // dataset for Pvt Resi Project in the Pipeline does not have a value for propertyPrice
      "Please provide a price for the property",
    ],
  },
  propertyTenure: {
    type: Number,
    required: [
      false, // dataset for Pvt Resi Project in the Pipeline does not have a value for propertyTenure
      "Please provide a tenure for the property",
    ],
  },
  propertyLevels: {
    type: String,
    required: [
      false, // dataset for Pvt Non-Landed Resi Property does not have a value for propertyLevels
      "Please provide the range of levels the property has",
    ],
  },
  propertyUnitsAvail: {
    type: Number,
    required: [
      false, // dataset for Pvt/HDB Property Transactions does not have a value for propertyUnitsAvail
      "Please provide the value for no. of available property units",
    ],
  },
  propertyDeveloperName: {
    type: String,
    required: [
      false, // dataset for Pvt/HDB Property Transactions does not have a value for propertyDeveloperName
      "Please provide the developer name for the property",
    ],
  },
  propertyPriceSqft: {
    type: Number,
    required: [
      false, // dataset for Pvt/HDB Property Transactions does not have a value for propertyPriceSqft
      "Please provide the price per sqft for the property",
    ],
  },
  propertyProjectName: {
    type: String,
    required: [
      false, // dataset for Pvt/HDB Property Transactions does not have a value for propertyProjectName
      "Please provide the project name for the project",
    ],
  },
  rentalPriceSqft: {
    type: Number,
    required: [
      false, // dataset for Pvt/HDB Property Transactions does not have a value for rentalPriceSqft
      "Please provide the price per sft for the property (Rental)",
    ],
  },
  rentalRefPeriod: {
    type: String,
    required: [
      false, // dataset for Pvt/HDB Property Transactions does not have a value for rentalRefPeriod
      "Please provide the reference period for the property (Rental)",
    ],
  },
});

module.exports = mongoose.model("MainData", MainDataSchema);
