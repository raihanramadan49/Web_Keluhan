const mongoose = require("mongoose");

const KeluhanSchema = mongoose.Schema({
  keluhanSender: {
    type: String,
    require: true,
  },
  keluhanTopic: {
    type: String,
    require: true,
  },
  keluhanIsi: {
    type: String,
    require: true,
  },
});

const Keluhan = mongoose.model("Keluhan", KeluhanSchema);
module.exports = Keluhan;
