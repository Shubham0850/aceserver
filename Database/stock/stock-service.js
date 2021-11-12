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

	}catch(err){
		//handle err
	}
};

module.exports = {
	createPacks,
	deleteWithCode
};