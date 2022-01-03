const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerGroup = new Schema(
  {
    name: { type: String, index: { unique: true }, required: true },
  },
  {
    timestamp: true,
  },
);
const customerGroup = mongoose.model('customerGroup', customerGroup);
module.exports = customerGroup;
