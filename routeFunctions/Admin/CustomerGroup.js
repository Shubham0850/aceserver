const CustomerGroup = require('../../Database/customerGroup/customer-group-model');
const CustomerService = require('../../Database/customerGroup/customer-group-service');

const { SUCCESS_MSG, FAILED } = require('./constants');
async function createCustomerGroup(req, res) {
  try {
    const { name } = req.body;

    const group = new CustomerGroup({
      name,
    });

    await group.save();

    return res.status(201).json({ message: SUCCESS_MSG });
  } catch (e) {
    return res.status(500).send(e);
  }
}

async function getCustomerGroup(req, res) {
  try {
    const customers = await CustomerGroup.find({});
    return res.status(200).send(customers);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

module.exports = { createCustomerGroup, getCustomerGroup };
