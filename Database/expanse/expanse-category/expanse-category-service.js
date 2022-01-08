const EXPANSE = require('./expanse-category');

async function get({ skip, limit }) {
  try {
    const expanses = await EXPANSE.find({}).skip(skip).limit(limit);
    return expanses;
  } catch (err) {}
}

async function getReport({ skip, limit }) {
  try {
    const report = await EXPANSE.aggregate([
      {
        $lookup: {
          from: 'expanses',
          localField: '_id',
          foreignField: 'expanseCategory',
          as: 'expanse',
        },
      },
      {
        $unwind: {
          path: '$expanse',
        },
      },
      {
        $group: {
          _id: '$_id',
          item: { $first: '$$ROOT' },
          totalAmount: {
            $sum: '$expanse.amount',
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: '$item.name',
          totalAmount: 1,
        },
      },
    ]);
    return report;
  } catch (err) {}
}

async function create({ name }) {
  try {
    console.log(name);
    const expanse = new EXPANSE({
      name,
    });

    s = await expanse.save();
    return true;
  } catch (err) {
    return false;
  }
}

// async function c() {
//   const s = await EXPANSE.find({});
//   console.log(s);
// }
// c();

module.exports = {
  create,
  get,
};
