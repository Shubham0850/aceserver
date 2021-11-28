const StockService = require('../../Database/stock/stock-service');
const getStock = async (req,res)=>{
	const {id,code,productId,today,notPrinted} = req.query;
	if(notPrinted!==undefined){
		const stock = await StockService.getBy({code : {$ne:'loose'}});
		return res.send(stock);
	}
	if(id!==undefined){
		const stock = await StockService.getBy({_id:id});
		return res.send(stock);
	}
	if(today!=undefined && today==='true'){
		const stock = await StockService.getTodaysStock();
		return res.send(stock);
	}
	if(productId!==undefined){
		const stock = await StockService.getBy({productId});
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