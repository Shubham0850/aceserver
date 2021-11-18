const StockModel = require('./stock-model');
const createPacks = async ({numberOfPacks,quantity,productId,branch,godown,inwardFrom,isLoose=false}) =>
{
	try{
		for(var i = 0;i<numberOfPacks;i++){
			if(isLoose) 
			{
				const looseStock = await StockModel.findOne({code:'loose',branch,godown});
				if(!looseStock){
					const newLooseStock = new StockModel({quantity:0,productId,branch,godown,inwardFrom,code:'loose'});
					await newLooseStock.save();
				}
				await StockModel.updateOne({code:'loose',branch,godown},{
					$inc:{
						quantity:quantity
					}
				});

			}
			else{
				const code = Date.now(); // this need to be chnaged
				const newPack = new StockModel({quantity,productId,branch,godown,inwardFrom,code});
				await newPack.save();
			}
		}
		return true;
	}catch(err){
		//handle err
	}
};

const deleteWithCode = async ({code})=>{
	try{
		await StockModel.deleteOne({code});
		return true;
	}catch(err){
		//handle err
		return false;
	}
};

const decrementStock = async({code,quantity,branch,godown}) => {
	try{
		if(code==='loose'){
			await StockModel.updateOne({code,branch,godown},{
				$inc:{
					quantity:-quantity
				}
			});
		}
		else{
			await StockModel.updateOne({code},{
				$set:{
					quantity:0
				}
			});
		}
		return true;
	}catch(err){
		//handle err
		return false;
	}
};

const getQuantity = async ({code})=>{
	try{
		const stock = await StockModel.findOne({code});
		return stock.quantity;
	}catch(err){
		//handle err
	}
};

const getBy = async(query) => {
	try{
		const stock = await StockModel.find(query).populate('productId','name price');
		return stock;

	}catch(err){
		//handle err
	}

};

const getTodaysStock = async ()=>{
	try{
		var start = new Date();
		start.setHours(0,0,0,0);
		var end = new Date();
		end.setHours(23,59,59,999);
		const stocksOfToday = await getBy({createdAt: {$gte: start, $lt: end}});
		return stocksOfToday;
	}catch(err){
		//handle err
	}
};
module.exports = {
	createPacks,
	deleteWithCode,
	decrementStock,
	getQuantity,
	getBy,
	getTodaysStock
};