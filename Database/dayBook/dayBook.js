const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dayBookSchema = new Schema(
  {
    party: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },

    type: { type: String },
    moneyIn: { type: Number },
    moneyOut: { type: Number },
  },
  {
    timestamps: true,
  },
);
const dayBook = mongoose.model('dayBook', dayBookSchema);
module.exports = dayBook;
