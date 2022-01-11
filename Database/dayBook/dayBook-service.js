const DayBookModel = require('./dayBook');
const moment = require('moment');

async function get() {
  var start = moment().startOf('day');
  var end = moment().endOf('day');
  var today = new Date(start).toISOString();
  var tomorrow = new Date(end).toISOString();

  try {
    const daybook = await DayBookModel.find({
      createdAt: {
        $gt: new Date(today),
        $lt: new Date(tomorrow),
      },
    });

    console.log(daybook);
    return daybook;
  } catch (err) {
    return false;
  }
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
    const expanses = await DayBookModel.findOneAndUpdate(
      { _id: _id },
      {
        party,

        type,
        moneyIn,
        moneyOut,
      },
      {
        new: true,
      },
    );

    return expanses;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function create({
  party,

  type,
  moneyIn,
  moneyOut,
}) {
  try {
    const daybook = new DayBookModel({
      party,

      type,
      moneyIn,
      moneyOut,
    });

    await daybook.save();
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  create,
  get,
  update,
};
