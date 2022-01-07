const customers = require('./customer-group-model');
require('../mongo').connect();
async function get(query) {
  try {
    const Customers = await customers.find({});
    return Customers;
  } catch (err) {
    //handle err
  }
}

async function create({ name }) {
  try {
    const customer = new customers({
      name,
    });
    await customer.save();
    return true;
  } catch (err) {
    console.log(err);
    //handle err
  }
}

create({ name: 'sample1' });

//exporting both of the function to use in the server
module.exports = {
  get,
  create,
};
