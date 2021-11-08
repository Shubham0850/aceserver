const StockCatagory  =  require('../../Database/stockCatagory/stockCatagory-service');

const getCustomers = async (req,res)=> {
	const stockGroups = await StockCatagory.get();
	if(stockGroups) return res.json(stockGroups);
	return res.sendStatus(404);
};

module.exports = getCustomers;