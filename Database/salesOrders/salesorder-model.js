const mongoose = require('mongoose');
const salesOrderSchema = new mongoose.Schema(
  {
    salesman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
    },
    voucherNo: {
      type: String,
      trim: true,
    },
    voucherDate: {
      type: Date,
    },
    status: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      trim: true,
    },
    dispatchedTo: {
      type: String,
      trim: true,
    },
    transporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'transporters',
    },
    marka: {
      type: String,
      trim: true,
    },
    account: {
      type: String,
      trim: true,
    },
    getNo: {
      type: String,
      trim: true,
    },
    defaultDisc: {
      type: Number,
      trim: true,
    },
    godown: {
      type: String,
      trim: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
        rate: {
          type: Number,
          default: 0,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        discountPercentage: {
          type: Number,
          default: 0,
        },
        grossAmount: {
          type: Number,
          default: 0,
        },
        igst: {
          type: Number,
          default: 0,
        },
        cgst: {
          type: Number,
          default: 0,
        },
        sgst: {
          type: Number,
          default: 0,
        },
        cess: {
          type: Number,
          default: 0,
        },
        hsnCode: {
          type: String,
          trim: true,
        },
        dispatchedBatches: [{ type: String }],
      },
    ],
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Salesorder = mongoose.model('Salesorder', salesOrderSchema);
module.exports = Salesorder;
