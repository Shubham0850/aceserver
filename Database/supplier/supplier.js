const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    blocking: {
      type: Boolean,
      default: false,
    },
    branch: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    code: {
      type: Number,
    },
    group: {
      type: String,
      trim: true,
    },
    contactPerson: {
      type: String,
      trim: true,
    },
    contactMobile: {
      type: Number,
    },
    email: {
      type: String,
      trim: true,
    },
    salesPerson: {
      type: String,
      trim: true,
    },
    creditDays: {
      type: Number,
    },
    creditLimit: {
      type: Number,
    },
    gstType: {
      type: String,
      trim: true,
    },
    gstNo: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);


const Supplier = mongoose.model('suppliers', supplierSchema);
module.exports = Supplier;
