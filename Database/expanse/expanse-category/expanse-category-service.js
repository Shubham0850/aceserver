const EXPANSE = require('./expanse-category');
async function get({ skip, limit }) {
  try {
    const expanses = await EXPANSE.find({}).skip(skip).limit(limit);
    return expanses;
  } catch (err) {}
}

async function create({ expanseCategory, categoryType, amount }) {
  try {
    const expanse = new EXPANSE({
      expanseCategory,
      categoryType,
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
