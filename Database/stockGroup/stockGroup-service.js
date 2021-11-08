const StockGroups = require('./stockGroup-model');
require('../mongo').connect();
async function get(){
	try{
		const stockGroups = await StockGroups.find({});
		return stockGroups;
	}catch(err){
		//handle err
	}
}
async function create(name){
	const stockGroup = new StockGroups({name});
	try{
		await stockGroup.save();
		return true;
	}catch (err){
		return false;
	}
}

module.exports = {
	create,get
};