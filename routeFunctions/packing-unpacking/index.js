const StockService = require('../../Database/stock/stock-service');
async function packandUnpack(req,res){
	try{
		const barcodesToBeChanged = req.body.barcodesToBeChanged;
		const {item,godown,branch} = req.body;
		await StockService.createPacks({
			godown:godown,
			branch: branch,
			quantity: item.masterPackQuantity,
			numberOfPacks: item.masterPack,
			productId: item.productId,
		});
		await StockService.createPacks({
			godown:godown,
			branch: branch,
			quantity: item.subMasterPackQuantity,
			numberOfPacks: item.subMasterPack,
			productId: item.productId,
		});
		StockService.createPacks({
			godown:godown,
			branch: branch,
			quantity: item.loose,
			numberOfPacks: 1,
			productId: item.productId,
			isLoose:true
		});
		for(let key in barcodesToBeChanged){
			await StockService.deleteWithCode({code:barcodesToBeChanged[key]});
		}
		return res.json({message:'success'});

	}catch(err){
		//handle err
		return res.sendStatus(500);
	}
}



module.exports = packandUnpack;