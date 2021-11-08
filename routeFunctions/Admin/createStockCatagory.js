const StockCatagory = require('../../Database/stockCatagory/stockCatagory-service');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createStockCatagory = async (req,res)=>{
	const {name} = req.body;
	const isCreated = await StockCatagory.create(name);
	if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
	else{
		return res.json({message:FAILED});
	}
};

module.exports = createStockCatagory;