const StockGroup = require('../../Database/stockGroup/stockGroup-service');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createStockGroup = async (req,res)=>{
	const {name} = req.body;
	const isCreated = await StockGroup.create(name);
	if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
	else{
		return res.json({message:FAILED});
	}
};

module.exports = createStockGroup;