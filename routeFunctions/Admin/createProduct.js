const Product = require('../../Database/product/product-service');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createProduct = async (req,res)=>{
	const {
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
	} = req.body;
	const isCreated = await Product.create({
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
	if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
	else{
		return res.json({message:FAILED});
	}
};

module.exports = createProduct;