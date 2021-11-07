const products = require('./product-model');
require('../mongo').connect();

async function get(){
	try{
		const Products = await products.find({});
		return Products;
	}catch(err){
		//handle err
	}
}

async function create({
	name  ='',
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

//exporting both of the function to use in the server 
module.exports = {
	create,get
};