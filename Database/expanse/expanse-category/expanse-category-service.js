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
          from: 'expanse',
          localField: '_id',
          foreignField: 'expanseCategory',
          as: 'expanse',
        },
      },
      {
        $group: {
          _id: '$expanseCategory',
          items: { $push: '$$ROOT' },
          amount: { $sum: '$expanse.amount' },
        },
      },
    ]);
    return expanses;
  } catch (err) {}
}

async function create({ name }) {
  try {
    console.log(name);
    const expanse = new EXPANSE({
      name,
    });

    s = await expanse.save();
    console.log(s);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  create,
  get,
};
