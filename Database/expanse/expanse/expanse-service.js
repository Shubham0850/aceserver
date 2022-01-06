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

async function update({
  _id,
  party,
  expanseCategory,
  paymentType,
  amount,
  balanceDue,
}) {
  try {
    const expanses = await EXPANSE.findOneAndUpdate(
      { _id: _id },
      {
        party,
        expanseCategory,
        paymentType,
        amount,
        balanceDue,
      },
      {
        new: true,
      },
    );

    return expanses;
  } catch (err) {
    return err;
  }
}

async function getReport({ limit, skip }) {
  try {
    const expanses = await EXPANSE.find({})
      .populate('expanseCategory')
      .skip(skip)
      .limit(limit);

    return expanses;
  } catch (err) {}
}

async function create({
  party,
  expanseCategory,
  paymentType,
  amount,
  balanceDue,
}) {
  try {
    const expanse = new EXPANSE({
      party,
      expanseCategory,
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

// create({party,
//   expanseCategory,
//   paymentType,
//   amount,
//   balanceDue,})

module.exports = {
  create,
  get,
  update,
};
