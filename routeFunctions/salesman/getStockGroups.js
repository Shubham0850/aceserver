const StockGroup  =  require('../../Database/stockGroup/stockGroup-service');

const getCustomers = async (req,res)=> {
	const stockGroups = await StockGroup.get();
	if(stockGroups) return res.json(stockGroups);
	return res.sendStatus(404);
};

module.exports = getCustomers;