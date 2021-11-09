const StockModel = require('./stock-model');
const createPacks = async ({numberOfPacks,quantity,productId,branch,godown,inwardFrom,isLoose=false}) =>
{
	try{
		for(var i = 0;i<numberOfPacks;i++){
			if(isLoose) 
			{
				const newPack = new StockModel({quantity,productId,branch,godown,inwardFrom,code:'loose'});
				await newPack.save();
			}
			else{
				const newPack = new StockModel({quantity,productId,branch,godown,inwardFrom});
				await newPack.save();
			}
		}
		return true;
	}catch(err){
		//handle err
	}
};

module.exports = {
	createPacks
};