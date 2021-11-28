const StockService = require('../../Database/stock/stock-service');

const printcode = async (req,res)=>{
	try{
		const {code} = req.body;
		await StockService.printCode(code);
		res.json({message:'success'});
	}catch(err){
		res.sendStatus(500);
	}
};

module.exports = printcode;