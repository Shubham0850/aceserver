const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expanseSchema = new Schema(
  {
    party: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    expanseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'expanseCategory',
    },

    paymentType: { type: String },
    amount: { type: Number },
    balanceDue: { type: Number },
  },
  {
    timestamps: true,
  },
);
const expanse = mongoose.model('expanse', expanseSchema);
module.exports = expanse;
