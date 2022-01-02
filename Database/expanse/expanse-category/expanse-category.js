const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expanseCategorySchema = new Schema(
  {
    expanseCategory: { type: String, index: { unique: true }, required: true },
    categoryType: { type: String },
    amount: { type: Number },
  },
  {
    timestamp: true,
  },
);
const expanseCategory = mongoose.model(
  'expanseCategory',
  expanseCategorySchema,
);
module.exports = expanseCategory;
