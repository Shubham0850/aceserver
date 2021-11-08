const StockCatagory = require('./stockCatagory-model');
require('../mongo').connect();
async function get(){
	try{
		const stockCatagorys = await StockCatagory.find({});
		return stockCatagorys;
	}catch(err){
		//handle err
	}
}
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
	create,get
};