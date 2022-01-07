const createUser = require('./createUser');
const getUsers = require('./getUsers');
const updateUser = require('./updateUser');
const createCustomer = require('./createCustomer');
const createProduct = require('./createProduct');
const createGst = require('./createGst');
const createStockGroup = require('./createStockGroup');
const createBrand = require('./createBrand');
const createStockCatagory = require('./createStockCatagory');
const deleteUser = require('./deleteUser');
const updateCustomer = require('./updateCustomer');
const { createCustomerGroup, getCustomerGroup } = require('./CustomerGroup');

module.exports = {
  createUser,
  getUsers,
  updateUser,
  createCustomer,
  createProduct,
  createGst,
  createStockGroup,
  createBrand,
  createStockCatagory,
  deleteUser,
  updateCustomer,
  createCustomerGroup,
  getCustomerGroup,
};
