const Brand = require('../../Database/brand/brand-service');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createBrand = async (req,res)=>{
	const {name} = req.body;
	const isCreated = await Brand.create(name);
	if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
	else{
		return res.json({message:FAILED});
	}
};

module.exports = createBrand;