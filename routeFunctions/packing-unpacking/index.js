const StockService = require('../../Database/stock/stock-service');
async function packandUnpack(req,res){
	try{
		const tobePacked = req.body.packingBarcodes;
		const {item,godown,branch} = req.body;
		await StockService.createPacks({
			godown:godown,
			branch: branch,
			quantity: item.masterPackQuantity,
			numberOfPacks: item.masterPack,
			productId: item.itemId,
		});
		await StockService.createPacks({
			godown:godown,
			branch: branch,
			quantity: item.subMasterPackQuantity,
			numberOfPacks: item.subMasterPack,
			productId: item.itemId,
		});
		StockService.createPacks({
			godown:godown,
			branch: branch,
			quantity: item.loose,
			numberOfPacks: 1,
			productId: item.itemId,
			isLoose:true
		});
		for(let key in tobePacked){
			await StockService.deleteWithCode({code:tobePacked[key]});
		}
		return res.json({message:'success'});

	}catch(err){
		//handle err
		return res.sendStatus(500);
	}
}



module.exports = packandUnpack;