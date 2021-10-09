const mongoose = require("mongoose");

const chargesSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//   },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ChargesModel", chargesSchema);
