const products = require('./product-model');
require('../mongo').connect();

async function get(query){
	try{
		const Products = await products.find(query);
		return Products;
	}catch(err){
		//handle err
	}
}

async function create({
	name ='',
	description='',
	modelNo='',
	price =0,
	stockGroup,
	stockCatagory,
	hsn ='',
	gst,
	barCodeNo='',
	tallyName='',
	brand,
	UOM='',
	packSize=0,
	weight=0 ,
	CBM=0
})
{
	try{
		const product = new products({
			name,
			description,
			modelNo,
			price,
			stockGroup,
			stockCatagory,
			hsn,
			gst,
			barCodeNo,
			tallyName,
			brand,
			UOM,
			packSize,
			weight,
			CBM
		});
		await product.save();
		return true;
	}catch(err){
		return false;
	}
}

async function incrimentInward({_id,count=0}){
	try{
		await products.findByIdAndUpdate({_id},{
			$inc:{
				inwardQuantity: count
			}
		});
		return true;

	}catch(err){
		//handle err
		console.log(err);
		return false;
	}
}

async function incrimentSell({_id,count=0}){
	try{
		await products.findByIdAndUpdate({_id},{
			$inc:{
				sellQuantity: count
			}
		});
		return true;

	}catch(err){
		//handle err
		console.log(err);
		return false;
	}
}
async function incrimentTransfer({_id,count=0}){
	try{
		await products.findByIdAndUpdate({_id},{
			$inc:{
				transferQuantity: count
			}
		});
		return true;

	}catch(err){
		//handle err
		console.log(err);
		return false;
	}
}

//exporting both of the function to use in the server 
module.exports = {
	create,
	get,
	incrimentInward,
	incrimentSell,
	incrimentTransfer,
};