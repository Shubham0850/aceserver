const InwardModel = require('../../Database/inward/inward');
const StockService = require('../../Database/stock/stock-service');
const InwardService = require('../../Database/inward/inward-service');
const ProductServices = require('../../Database/product/product-service');
const createBarcode = async (req,res)=>{
	try{
		const inwardId = req.params.id;
		const inward = await InwardModel.findById({_id:inwardId});
		if(inward.status!=='pendingBarcode'){
			return res.json({message:'failed'});
		}
		for(var i = 0;i<inward.items.length;i++){
			const item = inward.items[i];
			await StockService.createPacks({
				godown:inward.godown,
				branch: inward.branch,
				quantity: item.masterPackQuantity,
				numberOfPacks: item.masterPack,
				productId: item.itemId,
				inwardFrom:inwardId
			});
			await StockService.createPacks({
				godown:inward.godown,
				branch: inward.branch,
				quantity: item.subMasterPackQuantity,
				numberOfPacks: item.subMasterPack,
				productId: item.itemId,
				inwardFrom:inwardId
			});
			StockService.createPacks({
				godown:inward.godown,
				branch: inward.branch,
				quantity: item.loose,
				numberOfPacks: 1,
				productId: item.itemId,
				inwardFrom:inwardId,
				isLoose:true
			});
			const totalQuantity = item.masterPack*item.masterPackQuantity  + item.subMasterPack*item.subMasterPackQuantity + item.loose;
			await ProductServices.incrimentInward({_id: item.itemId,count:totalQuantity});
		}
		await InwardService.chngStatus({_id:inwardId,status:'barcodeGenerated'});
		return res.json({message:'success'});
	}catch(err){
		// console.log(err);
		return res.sendStatus(500);
	}
};

module.exports = createBarcode;