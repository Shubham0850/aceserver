const EXPANSE = require('./expanse-model');
async function get({ limit, skip }) {
  try {
    const expanses = await EXPANSE.find({})
      .populate('expanseCategory')
      .skip(skip)
      .limit(limit);
    return expanses;
  } catch (err) {}
}

async function create({ party, category, paymentType, amount, balanceDue }) {
  try {
    const expanse = new EXPANSE({
      party,
      category,
      paymentType,
      amount,
      balanceDue,
    });

    await expanse.save();
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  create,
  get,
};
