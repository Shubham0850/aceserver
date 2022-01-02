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
    const products = await SalesorderModel.aggregate([
      {
        $match: {
          status: 'CONFIRMED',
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
          items: { $push: '$$ROOT' },
        },
      },
      {
        $addFields: {
          totalrate: { $sum: '$items.items.rate' },
          totalGross: { $sum: '$items.items.grossAmount' },
          totalQuantity: { $sum: '$items.items.quantity' },
          product: { $arrayElemAt: ['$items', 0] },
        },
      },
      {
        $project: {
          totalrate: 1,
          totalGross: 1,
          totalQuantity: 1,
          _id: 1,
          product: { $arrayElemAt: ['$product.productDetails', 0] },
        },
      },
      {
        $sort: {},
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

async function getItemReportByParty(req, res) {
  //61ba1a4a2212082f7f358f68
  // 61ba1aac2212082f7f358f6c
  let skip = 0;
  var page = 0;
  if (req.query.page) {
    page = req.query.page;
    skip = req.query.page * LIMIT;
  }
  try {
    const pro = await SalesorderModel.aggregate([
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
      {
        $sort: {},
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
            $sum: { $multiply: ['$product.price', '$items.quantity'] },
          },
          grossAmount: { $sum: '$items.grossAmount' },
          quantity: { $sum: '$items.quantity' },
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
          product: { $arrayElemAt: ['$items', 0] },
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
