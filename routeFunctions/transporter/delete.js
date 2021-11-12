const TransporterModel = require('../../Database/transporter/tranporter-schema');

const deleteTransporter = async (req,res)=>{
	try{
		const _id = req.params.id;
		await TransporterModel.findByIdAndDelete({_id});
		res.json({message:'success'});
	}catch(err){
		res.sendStatus(500);
	}
};

module.exports = deleteTransporter;