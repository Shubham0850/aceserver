const customers = require('./customer-model');
require('../mongo').connect();
async function get(query) {
  try {
    const Customers = await customers
      .find(query)
      .populate('salesPerson', 'name email');
    return Customers;
  } catch (err) {
    //handle err
  }
}

async function create({
  branch = '',
  ledgerGroup = '',
  name = '',
  contactPersonName = '',
  contactNumber = '',
  email = '',
  salesPerson,
  creditDays = '',
  creditLimit = '',
  gstType = '',
  gstNumber = '',
  state = '',
  address = '',
  pincode = '',
  blocking = false,
  billType = '',
  accounts = [],
  partyGoup = '',
}) {
  try {
    const customer = new customers({
      branch,
      ledgerGroup,
      name,
      contactPersonName,
      contactNumber,
      email,
      salesPerson,
      creditDays,
      creditLimit,
      gstType,
      gstNumber,
      state,
      pincode,
      address,
      blocking,
      billType,
      accounts,
      partyGoup,
    });
    await customer.save();
    return true;
  } catch (err) {
    //handle err
  }
}

async function addIntoLedger({ _id, type, depositType, amount = 0 }) {
  try {
    await customers.findOneAndUpdate(
      { _id },
      {
        $push: {
          ledger: {
            type,
            depositType,
            amount,
          },
        },
      },
    );
  } catch (err) {
    console.log(err);
    //handle err
  }
}
//exporting both of the function to use in the server
module.exports = {
  get,
  create,
  addIntoLedger,
};
