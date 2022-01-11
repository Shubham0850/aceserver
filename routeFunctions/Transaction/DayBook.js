var moment = require('moment');

const { PENDING_CONFIRMATION, FAILED } = require('../../Helpers/constants');
const dayBookModel = require('../../Database/dayBook/dayBook');
const dayBookService = require('../../Database/dayBook/dayBook-service');

async function dayBook(req, res) {
  var start = moment().startOf('day');
  var end = moment().endOf('day');
  var today = new Date(start).toISOString();
  var tomorrow = new Date(end).toISOString();

  try {
    const report = await dayBookService.create(req.body);
    if (report) {
      return res.status(200).send(report);
    } else {
      return res.status(400).send(report);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

async function getDayBook(req, res) {
  try {
    const report = await dayBookService.get();
    if (report) {
      return res.status(200).send(report);
    } else {
      return res.status(400).send(report);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
}

module.exports = {
  dayBook,
  getDayBook,
};
