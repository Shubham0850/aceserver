const getCustomers = require('./getCustomers');
const getProducts = require('./getProducts');
const getGsts = require('./getGsts');
const getStockGroups = require('./getStockGroups');
const getBrands = require('./getBrands');
const getStockCatagorys = require('./getStockCatagorys');
const createBarcode = require('../stock/createBarcode');
module.exports = {
	getCustomers,
	getProducts,
	getGsts,
	getStockGroups,
	getBrands,
	getStockCatagorys,
	createBarcode
};