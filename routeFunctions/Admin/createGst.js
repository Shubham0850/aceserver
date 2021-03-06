const GST = require('../../Database/gst/gst-service');
const {SUCCESS_MSG,FAILED} = require('./constants');
const createGst = async (req,res)=>{
	const {
		name,
		applicableFrom,
		description,
		calcType,
		revrChrg,
		taxability,
		iGst,
		cGst,
		sGst,
		cess} = req.body;
	const isCreated = await GST.create({
		name,
		applicableFrom,
		description,
		calcType,
		taxability,
		revrChrg,
		iGst,
		cGst,
		sGst,
		cess});
	if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
	else{
		return res.json({message:FAILED});
	}
};

module.exports = createGst;