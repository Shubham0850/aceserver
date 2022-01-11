const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerGroupSchema = new Schema(
  {
    name: { type: String, index: { unique: true }, required: true },
  },
  {
    timestamp: true,
  },
);
const customerGroup = mongoose.model('customerGroup', customerGroupSchema);
module.exports = customerGroup;
