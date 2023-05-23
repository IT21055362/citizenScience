const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SupllierSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  contactNo: {
    type: String,
    required: true,
  },
  typeOfLitter: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true
  },
  photo: {
    type: String
},
  status: {
    type: Boolean,
    required: true
  }
},
  {
    timestamps: true
  }
);

const Supplier = mongoose.model("Supplier", SupllierSchema);

module.exports = Supplier;

