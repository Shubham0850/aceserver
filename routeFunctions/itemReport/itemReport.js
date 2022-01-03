const SalesorderModel = require('../../Database/salesOrders/salesorder-model');
const ProductsModel = require('../../Database/product/product-model');
const ProductsService = require('../../Database/product/product-service');
const mongoose = require('mongoose');

const LIMIT = 10;
async function getAllItems(req, res) {
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const report = await ProductsService.get({ limit: LIMIT, skip: skip });
    return res.send(report);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getLowStockReport(req, res) {
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const report = await ProductsService.getLowStock({
      limit: LIMIT,
      skip: skip,
    });
    return res.status(200).send(report);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getItemWiseDiscount(req, res) {
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
      //     status: 'CONFIRMED',
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
          as: 'productDetails',
        },
      },
      { $addFields: { product: { $arrayElemAt: ['$product', 0] } } },

      {
        $group: {
          _id: '$items.productId',
          items: { $push: '$$ROOT' },

          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalPurchase: {
            $sum: {
              $multiply: ['$product.purchasePrice', '$items.quantity'],
            },
          },
          totalgrossAmount: { $sum: '$items.grossAmount' },
          quantity: { $sum: '$items.quantity' },
        },
      },

      {
        $addFields: {
          product: { $arrayElemAt: ['$items', 0] },
        },
      },
      {
        $addFields: {
          product: { $arrayElemAt: ['$product.productDetails', 0] },
        },
      },
      {
        $project: {
          totalSale: 1,
          totalQuantity: 1,
          totalPurchase: 1,
          totalgrossAmount: 1,
          quantity: 1,
          totalDiscountAmount: {
            $subtract: ['$totalSate', '$totalgrossAmount'],
          },

          _id: 1,
          itemName: '$product.name',
        },
      },

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

async function getItemReportByParty(req, res) {
  //61ba1a4a2212082f7f358f68
  // 61ba1aac2212082f7f358f6c
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
  try {
    const report = await SalesorderModel.aggregate([
      {
        $match: {
          match,
        },
      },
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
          as: 'productDetails',
        },
      },
      {
        $group: {
          _id: '$items.productId',
          doc: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$doc' },
      },

      { $addFields: { product: { $arrayElemAt: ['$productDetails', 0] } } },
      {
        $project: {
          product: '$product',
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

async function getStockSummary(req, res) {
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const report = await ProductsModel.find({}).skip(skip).limit(LIMIT);
    return res.status(200).send(report);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getItemPandL(req, res) {
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
          _id: '$product._id',
          items: { $push: '$$ROOT' },
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
          _id: '$product._id',
          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          quantity: 1,
          product: { $arrayElemAt: ['$items', 0] },
          taxReceivable: '0',
          taxPayable: '0',
          saleReturn: '0',
          purchaseReturn: '0',
        },
      },
      {
        $project: {
          _id: '$product._id',
          items: 1,
          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          quantity: 1,
          product: '$product.product',
          taxReceivable: 1,
          taxPayable: 1,
          saleReturn: 1,
          purchaseReturn: 1,
        },
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

module.exports = {
  getItemWiseDiscount,
  getStockSummary,
  getAllItems,
  getLowStockReport,
  getItemReportByParty,
  getItemPandL,
};
