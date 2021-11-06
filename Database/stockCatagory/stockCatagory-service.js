const StockCatagory = require('./stockCatagory-model');
require('../mongo').connect();

async function create(name){
	const stockCatagory = new StockCatagory({name});
	try{
		await stockCatagory.save();
		return true;
	}catch (err){
		return false;
	}
}

module.exports = {
	create
};