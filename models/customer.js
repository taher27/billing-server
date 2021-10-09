const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  // company name
  cname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // 13 digit check
  vat: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pobox: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CustomerSchema", customerSchema);
