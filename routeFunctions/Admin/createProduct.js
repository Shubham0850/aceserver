const ProductModel = require('../../Database/product/product-model');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createProduct = async (req,res)=>{
	try{
		const newProduct = new ProductModel(req.body);
		const isCreated = await newProduct.save();
		if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
		else{
			return res.json({message:FAILED});
		}
	}
	catch(err){
		return res.sendStatus(500); 
	}
};

module.exports = createProduct;