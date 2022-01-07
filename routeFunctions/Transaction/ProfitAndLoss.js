const SalesModel = require('../../Database/salesOrders/salesorder-model');
const inwardModel = require('../../Database/inward/inward');

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
async function ProfitAndLoss() {
  try {
    const report = await SalesModel.aggregate([
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
          totalPurchase: 1,
          grossAmount: 1,
          invoice: '$doc.voucherNo',
          createdAt: '$doc.createdAt',
          payment: 'NA',
          status: '$doc.status',
          totalTax: 1,
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
          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          invoice: '$doc.voucherNo',
          createdAt: '$doc.createdAt',
          payment: 'NA',
          status: '$doc.status',
          totalTax: 1,
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
    ]);
    let statement = [];
    // report.forEach(data => {
    //   let temp = { ...data };
    //   temp['balance'] = 0;
    //   let invoice = temp.invoice.split('/');
    //   temp['invoice'] = parseInt(invoice[2]);
    //   temp['Transaction'] = invoice[0];

    //   if (data.status == PENDING_CONFIRMATION || data.status == FAILED) {
    //     temp['balance'] = data.totalSale;
    //   }

    //   statement.push(temp);
    // });
    console.log(report);

    //return res.status(200).send(statement);
  } catch (e) {
    console.log(e);
    // res.status(400).send(e);
  }
}

ProfitAndLoss();
module.exports = ProfitAndLoss;
