const TransporterModel = require('../../Database/transporter/tranporter-schema');

const create = async (req,res)=>{
	try{
		const transporter = new TransporterModel(req.body);
		await transporter.save();
		res.json({message:'success'});

	}catch(err){
		res.sendStatus(500);
	}
};


module.exports = create;