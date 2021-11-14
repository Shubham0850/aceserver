const TransporterModel = require('../../Database/transporter/tranporter-schema');

const get = async (req,res)=>{
	try{
		const {id,name} = req.query;
		if(id!==undefined){
			const transporter = await TransporterModel.findById({_id:id});
			return res.send(transporter);
		}
		const transporters = await TransporterModel.find({
			name: { $regex: (name==undefined)?'':name, $options: '-i'},
		});
		return res.json({transporters});
	}
	catch(err){
		//handle err
		res.sendStatus(500);
	}
};
module.exports = get;