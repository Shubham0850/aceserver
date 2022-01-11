const SalesModel = require('../../Database/salesOrders/salesorder-model');
const { PENDING_CONFIRMATION, FAILED } = require('../../Helpers/constants');
async function AllTransactions(req, res) {
  try {
    const report = await SalesModel.aggregate([
      {
        $unionWith: {
          coll: 'inwards',
        },
      },

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
        $lookup: {
          from: 'suppliers',
          localField: 'party',
          foreignField: '_id',
          as: 'supplier',
        },
      },

      {
        $addFields: { customer: { $arrayElemAt: ['$customer', 0] } },
        $addFields: { supplier: { $arrayElemAt: ['$supplier', 0] } },
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
          supplier: '$doc.supplier',

          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          invoice: '$doc.voucherNo',
          createdAt: '$doc.createdAt',
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

      if (invoice[0] == 'inw') {
        temp['transaction'] = 'purchase';
        temp['moneyIn'] = 0;
        temp['moneyOut'] = data.grossAmount;
        temp['party'] = data.supplier;
      }
      if (invoice[0] == 'sale') {
        temp['transaction'] = 'sale';
        temp['moneyIn'] = 0;

        if (data.status == PENDING_CONFIRMATION || data.status == FAILED) {
          temp['moneyIn'] = data.totalSale;
        }
        temp['moneyOut'] = 0;
        temp['party'] = data.customer;
      }

      delete temp.supplier;
      delete temp.customer;
      statement.push(temp);
    });
    return res.status(200).send(statement);
  } catch (e) {
    res.status(400).send(e);
  }
}
module.exports = AllTransactions;
