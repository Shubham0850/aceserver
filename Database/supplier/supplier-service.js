const SupplierModel = require('./supplier');
require('../mongo').connect();
async function get() {
  try {
    const supplier = await SupplierModel.find({});
    return supplier;
  } catch (err) {
    return false;
    //handle err
  }
}
async function create({
  blocking,
  branch,
  name,
  code,
  group,
  contactPerson,
  contactMobile,
  email,
  salesPerson,
  creditDays,
  creditLimit,
  gstTyp,
  gstNo,
  state,
  address,
}) {
  const supplier = new SupplierModel({
    blocking,
    branch,
    name,
    code,
    group,
    contactPerson,
    contactMobile,
    email,
    salesPerson,
    creditDays,
    creditLimit,
    gstTyp,
    gstNo,
    state,
    address,
  });
  try {
    await supplier.save();
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  create,
  get,
};
