const StockService = require('../../Database/stock/stock-service');
const getStock = async (req,res)=>{
	const {_id,code} = req.body;
	if(_id!==undefined){
		const stock = await StockService.getBy({_id});
		return res.send(stock);
	}
	if(code!==undefined){
		const stock = await StockService.getBy({code});
		return res.send(stock);
	}
	const stocks = await StockService.getBy({});
	return res.json(stocks);
};

module.exports = getStock;