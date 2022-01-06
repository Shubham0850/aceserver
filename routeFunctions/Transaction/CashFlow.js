const SalesModel = require('../../Database/salesOrders/salesorder-model');
const { PENDING_CONFIRMATION, FAILED } = require('../../Helpers/constants');
async function CashFlow(req, res) {
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
          items: '$doc.items',
          totalSale: 1,
          totalPurchase: 1,
          grossAmount: 1,
          invoice: '$doc.voucherNo',
          createdAt: '$doc.createdAt',
          status: '$doc.status',
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
    let statement = [];
    var cashIn = 0;
    var cashOut = 0;
    var running = 0;
    report.forEach(data => {
      let temp = { ...data };
      let invoice = temp.invoice.split('/');
      temp['invoice'] = parseInt(invoice[2]);

      if (invoice[0] == 'inw') {
        temp['type'] = 'purchase';
        temp['cashIn'] = 0;
        temp['cashOut'] = data.grossAmount;
        temp['party'] = data.supplier;
      }
      if (invoice[0] == 'sale') {
        temp['type'] = 'sale';
        temp['cashIn'] = data.totalSale;

        if (data.status == PENDING_CONFIRMATION || data.status == FAILED) {
          temp['cashIn'] = 0;
        }

        temp['cashOut'] = 0;
        temp['party'] = data.customer;
      }

      running = running + temp['cashIn'] - temp['cashOut'];
      temp['running'] = running;
      temp['category'] = '';

      delete temp.supplier;
      delete temp.customer;
      statement.push(temp);
    });

    return res.status(200).send(statement);
  } catch (e) {
    res.status(400).send(e);
  }
}
module.exports = CashFlow;
