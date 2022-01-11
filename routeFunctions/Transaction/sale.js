const SalesModel = require('../../Database/salesOrders/salesorder-model');
const { PENDING_CONFIRMATION, FAILED } = require('../../Helpers/constants');
async function Sale(req, res) {
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
        $addFields: { customer: { $arrayElemAt: ['$customer', 0] } },
      },
      {
        $group: {
          _id: '$_id',
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
          customer: '$doc.customer',
          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          invoice: '$doc.voucherNo',
          createdAt: '$doc.createdAt',
          payment: 'NA',
          status: '$doc.status',
        },
      },
    ]);
    let statement = [];
    report.forEach(data => {
      let temp = { ...data };
      temp['balance'] = 0;
      let invoice = temp.invoice.split('/');
      temp['invoice'] = parseInt(invoice[2]);
      temp['Transaction'] = invoice[0];

      if (data.status == PENDING_CONFIRMATION || data.status == FAILED) {
        temp['balance'] = data.totalSale;
      }

      statement.push(temp);
    });

    return res.status(200).send(statement);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}
module.exports = Sale;
