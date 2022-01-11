const EXPANSE = require('./expanse-item');
async function get({ limit, skip }) {
  try {
    const expanseitem = await EXPANSE.find({}).skip(skip).limit(limit);
    return expanseitem;
  } catch (err) {}
}

async function create({ expanseItem, unitprice, quantity, amount }) {
  try {
    const expanse = new EXPANSE({
      expanseItem,
      unitprice,
      quantity,
      amount,
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
