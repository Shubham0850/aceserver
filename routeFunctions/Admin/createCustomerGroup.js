const CustomerGroup = require('../../Database/customer/customer-model');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createCustomerGroup = async (req, res) => {
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
};

module.exports = createCustomerGroup;
