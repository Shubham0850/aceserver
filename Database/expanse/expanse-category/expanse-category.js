const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expanseCategorySchema = new Schema(
  {
    name: { type: String, index: { unique: true }, required: true },
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
