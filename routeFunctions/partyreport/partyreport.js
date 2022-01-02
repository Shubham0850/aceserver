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
  try {
    //const report = await salesorderModel.find({ "item.productId" : req.body.item})
    const report = await SalesorderModel.aggregate([
      {
        $unwind: {
          path: '$items',
        },
      },
      {
        $match: {
          match,
        },
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
        $group: {
          _id: '$_id',

          totalquantity: { $sum: '$data.items.quantity' },
          totalgrossAmount: { $sum: '$data.items.grossAmount' },
          totalrate: { $sum: '$data.items.rate' },
        },
      },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customers',
        },
      },
      {
        $project: {
          _id: 1,
          partyName: { $arrayElemAt: ['$customers.name', 0] },
          totalquantity: 1,
          data: 1,
          totalgrossAmount: 1,
          totalrate: 1,
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
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  console.log(req.body);
  try {
    const report = await SalesorderModel.aggregate([
      {
        $match: {
          party: mongoose.Types.ObjectId(req.body.party),
        },
      },
      {
        $unwind: {
          path: '$items',
        },
      },

      // {
      //   $project: {
      //     _id: 1,
      //     status: 1,
      //     items: 1,
      //     createdAt: 1,
      //     updatedAt: 1,
      //     voucherNo: 1,
      //     product: { $arrayElemAt: ['$product', 0] },
      //   },
      // },
      {
        $group: {
          _id: '$_id',
          items: { $push: '$$ROOT' },
        },
      },
      {
        $addFields: {
          totalrate: { $sum: '$items.items.rate' },
          totalGross: { $sum: '$items.items.grossAmount' },
          totalQuantity: { $sum: '$items.items.quantity' },
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
          items: 1,
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

    return res.status(200).send(report);
  } catch (e) {
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
      { $addFields: { product: { $arrayElemAt: ['$product', 0] } } },

      {
        $group: {
          _id: '$party',
          // doc: { $push: '$$ROOT' },
          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalPurchase: {
            $sum: { $multiply: ['$product.price', '$items.quantity'] },
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
          from: 'partGroup',
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
        $group: {
          _id: '$partyGroup',
          doc: { $push: '$$ROOT' },
          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalPurchase: {
            $sum: { $multiply: ['$product.price', '$items.quantity'] },
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
    return res.status(200).send(report);
  } catch (e) {
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
            $sum: { $multiply: ['$product.price', '$items.quantity'] },
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
