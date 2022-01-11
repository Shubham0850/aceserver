const SalesModel = require('../../Database/salesOrders/salesorder-model');
const { PENDING_CONFIRMATION, FAILED } = require('../../Helpers/constants');
async function BillWise(req, res) {
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
      let invoice = temp.invoice.split('/');
      temp['invoice'] = parseInt(invoice[2]);

      statement.push(temp);
    });

    return res.status(200).send(statement);
  } catch (e) {
    res.status(400).send(e);
  }
}
module.exports = BillWise;
