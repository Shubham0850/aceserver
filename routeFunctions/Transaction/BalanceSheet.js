const SalesModel = require('../../Database/salesOrders/salesorder-model');
const inwardModel = require('../../Database/inward/inward');
const productModel = require('../../Database/product/product-model');

const { PENDING_CONFIRMATION, FAILED } = require('../../Helpers/constants');

const calculateGst = ({
  amount = 0,
  cgst = 0,
  sgst = 0,
  igst = 0,
  cess = 0,
}) => {
  return (
    (amount * cgst) / 100 +
    (amount * sgst) / 100 +
    (amount * igst) / 100 +
    (amount * cess) / 100
  );
};
async function BalanceSheet(req, res) {
  try {
    const report1 = await SalesModel.aggregate([
      {
        $unwind: {
          path: '$items',
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

      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalTax: {
            $sum: {
              $add: [
                { $add: ['$items.cgst', '$items.sgst'] },
                { $add: ['$items.igst', '$items.cess'] },
              ],
            },
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
          totalSale: 1,
          grossAmount: 1,

          TaxReceivable: {
            $divide: [
              {
                $multiply: ['$totalTax', '$totalSale'],
              },
              100,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalTaxReceivable: {
            $sum: '$TaxReceivable',
          },
          totalSale: {
            $sum: '$totalSale',
          },
          SalegrossAmount: {
            $sum: '$grossAmount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalTaxReceivable: 1,
          totalSale: 1,
          SalegrossAmount: 1,
        },
      },
    ]);
    const report2 = await inwardModel.aggregate([
      {
        $unwind: {
          path: '$items',
        },
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'party',
          foreignField: '_id',
          as: 'customer',
        },
      },

      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          totalSale: {
            $sum: { $multiply: ['$items.quantity', '$items.rate'] },
          },
          totalTax: {
            $sum: {
              $add: [
                { $add: ['$items.cgst', '$items.sgst'] },
                { $add: ['$items.igst', '$items.cess'] },
              ],
            },
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
          totalPurchase: 1,
          grossAmount: 1,

          TaxAmount: {
            $divide: [
              {
                $multiply: ['$totalTax', '$totalSale'],
              },
              100,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalTaxPayable: {
            $sum: '$TaxAmount',
          },
          totalPurchase: {
            $sum: '$totalPurchase',
          },
          PurchasegrossAmount: {
            $sum: '$grossAmount',
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalTaxPayable: 1,
          totalPurchase: 1,
          PurchasegrossAmount: 1,
        },
      },
    ]);

    const report3 = await productModel.aggregate([
      {
        $project: {
          _id: 0,
          closingStock: {
            $subtract: [
              { $add: ['$openingQuantity', '$inwardQuantity'] },
              { $add: ['$sellQuantity', '$transferQuantity'] },
            ],
          },
          stockValue: {
            $multiply: [
              {
                $subtract: [
                  { $add: ['$openingQuantity', '$inwardQuantity'] },
                  { $add: ['$sellQuantity', '$transferQuantity'] },
                ],
              },
              '$price',
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalClosingStock: {
            $sum: '$closingStock',
          },
          totalStockValue: {
            $sum: '$stockValue',
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalClosingStock: 1,
          totalStockValue: 1,
        },
      },
    ]);
    report = { ...report1[0], ...report2[0], ...report3[0] };
    return res.status(200).send(report);
  } catch (e) {
    // console.log(e);
    return res.status(400).send(e);
  }
}

module.exports = BalanceSheet;
