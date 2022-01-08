const SalesorderModel = require('../../Database/salesOrders/salesorder-model');
const ProductsModel = require('../../Database/product/product-model');
const ProductsService = require('../../Database/product/product-service');
const PartyModel = require('../../Database/customer/customer-model');
const mongoose = require('mongoose');
const {
  PENDING_CONFIRMATION,
  CONFIRMED,
  SUCCESS,
  FAILED,
  DISPATCHED,
  LIMIT,
} = require('./constants.js');

// async function getReportByParty(req, res) {
//   let skip = 0;
//   var page = 0;
//   if (req.query.page) {
//     page = req.query.page;
//     skip = req.query.page * LIMIT;
//   }
//   try {
//     const report = await SalesorderModel.find({ party: req.query._id })
//       .populate('party', 'name')
//       .populate('items.productId', 'name')
//       .skip(skip)
//       .limit(LIMIT);

//     //console.log(report);
//     return res.send(report);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// }

async function getPartyReportByItem(req, res) {
  let skip = 0;
  var page = 0;
  var match = null;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }

  if (req.body.productId) {
    match = {
      'items.productId': mongoose.Types.ObjectId(req.body.productId),
    };
  }
  if (req.query.productId) {
    match = {
      'items.productId': mongoose.Types.ObjectId(req.query.productId),
    };
  }
  try {
    //const report = await salesorderModel.find({ "item.productId" : req.body.item})
    const report = await SalesorderModel.aggregate([
      {
        $unwind: {
          path: '$items',
        },
      },
      {
        $match: match,
      },

      {
        $group: {
          _id: '$party',
          data: { $push: '$$ROOT' },
          totalQuantity: { $sum: '$data.items.quantity' },
        },
      },

      {
        $project: {
          _id: 1,
          partyName: { $arrayElemAt: ['$customers.name', 0] },
          totalQuantity: 1,
          data: 1,
        },
      },
      {
        $unwind: {
          path: '$data',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'data.items.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $addFields: { product: { $arrayElemAt: ['$product', 0] } } },

      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          totalQuantity: { $sum: '$data.items.quantity' },
          totalGrossAmount: { $sum: '$data.items.grossAmount' },
          totalSale: {
            $sum: { $multiply: ['$data.items.quantity', '$data.items.rate'] },
          },
        },
      },

      {
        $lookup: {
          from: 'customers',
          localField: 'doc.data.party',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $project: {
          _id: 1,
          product: 1,
          party: { $arrayElemAt: ['$customer', 0] },
          totalQuantity: 1,
          totalGrossAmount: 1,
          totalSale: 1,
          totalPurchase: {
            $multiply: ['$totalQuantity', '$doc.product.purchasePrice'],
          },
        },
      },
      // {
      //   $sort: {},
      // },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);

    return res.status(200).send(report);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
async function getAllParties(req, res) {
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const report = await PartyModel.find({}).skip(skip).limit(LIMIT);
    return res.status(200).send(report);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getPartyStatement(req, res) {
  let skip = 0;
  var page = 0;
  var match = null;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  if (req.body.party) {
    match = {
      party: mongoose.Types.ObjectId(req.body.party),
    };
  }
  if (req.query.party) {
    match = {
      party: mongoose.Types.ObjectId(req.query.party),
    };
  }
  try {
    const report = await SalesorderModel.aggregate([
      {
        $match: match,
      },
      {
        $unwind: {
          path: '$items',
        },
      },

      {
        $project: {
          _id: 1,
          status: 1,
          items: 1,
          createdAt: 1,
          updatedAt: 1,
          voucherNo: 1,
          product: { $arrayElemAt: ['$product', 0] },
        },
      },
      {
        $group: {
          _id: '$_id',
          items: { $push: '$$ROOT' },
          totalrate: {
            $sum: { $multiply: ['$items.rate', '$items.quantity'] },
          },
          totalGross: { $sum: '$items.grossAmount' },
          totalQuantity: { $sum: '$items.quantity' },
        },
      },
      {
        $addFields: {
          salesDetails: { $arrayElemAt: ['$items', 0] },
          date: '$salesDetails.createdAt',
        },
      },
      {
        $project: {
          totalrate: 1,
          totalGross: 1,
          totalQuantity: 1,
          voucherNo: '$salesDetails.voucherNo',
          status: '$salesDetails.status',
          createdAt: '$salesDetails.createdAt',
          updatedAt: '$salesDetails.updatedAt',
        },
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);
    let statement = [];
    let total = 0;
    report.forEach(data => {
      let temp = { ...data };
      temp['total'] = total + data.totalrate;
      total = total + data.totalrate;
      temp['receivableBalance'] = 0;

      if (data.status == PENDING_CONFIRMATION || data.status == FAILED) {
        temp['PaidReceived'] = 0;
      } else {
        temp['receivableBalance'] = data.totalrate;
        temp['PaidReceived'] = data.totalrate;
      }
      temp['TxnBalance'] = data.totalrate - temp['receivableBalance'];

      statement.push(temp);
    });

    return res.status(200).send(statement);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

async function getSalePurchaseByParty(req, res) {
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const report = await SalesorderModel.aggregate([
      {
        $unwind: {
          path: '$items',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'party',
          foreignField: '_id',
          as: 'customer',
        },
      },
      { $addFields: { product: { $arrayElemAt: ['$product', 0] } } },
      { $addFields: { customer: { $arrayElemAt: ['$customer', 0] } } },

      {
        $group: {
          _id: '$party',
          doc: { $first: '$$ROOT' },
          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalPurchase: {
            $sum: { $multiply: ['$product.purchasePrice', '$items.quantity'] },
          },
          grossAmount: { $sum: '$items.grossAmount' },
        },
      },
      {
        $project: {
          _id: 1,
          party: '$doc.customer.name',
          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          netProfitorLoss: { $subtract: ['$totalSale', '$totalPurchase'] },
        },
      },
      // {
      //   $sort: {},
      // },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);
    return res.status(200).send(report);
  } catch (e) {
    res.status(500).send(e);
  }
}
async function getSalePurchaseByPartyGroup(req, res) {
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const report = await SalesorderModel.aggregate([
      {
        $unwind: {
          path: '$items',
        },
      },
      {
        $lookup: {
          from: 'customerGroup',
          localField: 'partyGroup',
          foreignField: '_id',
          as: 'partyGroup',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $addFields: { product: { $arrayElemAt: ['$product', 0] } } },
      { $addFields: { partyGroup: { $arrayElemAt: ['$partyGroup', 0] } } },
      {
        $match: {
          partyGroup: {
            $exists: true,
            $ne: null,
          },
        },
      },

      {
        $group: {
          _id: '$partyGroup',
          doc: { $first: '$$ROOT' },
          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalPurchase: {
            $sum: { $multiply: ['$product.purchasePrice', '$items.quantity'] },
          },
          grossAmount: { $sum: '$items.grossAmount' },
        },
      },
      // {
      //   $sort: {},
      // },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);
    console.log(report);
    return res.status(200).send(report);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

async function getPartyPandL(req, res) {
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const report = await SalesorderModel.aggregate([
      // {
      //   $match: {
      //     party: mongoose.Types.ObjectId(req.body.party),
      //   },
      // },
      {
        $unwind: {
          path: '$items',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'party',
          foreignField: '_id',
          as: 'customer',
        },
      },
      { $addFields: { product: { $arrayElemAt: ['$product', 0] } } },
      { $addFields: { customer: { $arrayElemAt: ['$customer', 0] } } },

      {
        $group: {
          _id: '$party',
          items: { $first: '$$ROOT' },
          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalPurchase: {
            $sum: { $multiply: ['$product.purchasePrice', '$items.quantity'] },
          },
          grossAmount: { $sum: '$items.grossAmount' },
          quantity: { $sum: '$items.quantity' },
        },
      },
      {
        $project: {
          _id: 1,
          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          quantity: 1,
          party: '$items.customer',
          netProfitorLoss: { $subtract: ['$totalSale', '$totalPurchase'] },
        },
      },
      // {
      //   $sort: {},
      // },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);
    console.log(report);
    return res.status(200).send(report);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
module.exports = {
  getAllParties,
  getPartyStatement,
  getPartyReportByItem,
  getSalePurchaseByPartyGroup,
  getSalePurchaseByParty,
  getPartyPandL,
};
