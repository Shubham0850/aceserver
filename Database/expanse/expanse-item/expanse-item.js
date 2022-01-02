const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expanseItemSchema = new Schema(
  {
    expanseItem: { type: String },
    unitprice: {
      type: Number,
    },
    quantity: { type: Number },
    amount: { type: Number },
  },
  {
    timestamps: true,
  },
);
const expanse = mongoose.model('expanseItem', expanseItemSchema);
module.exports = expanse;
