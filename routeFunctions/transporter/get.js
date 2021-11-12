const TransporterModel = require('../../Database/transporter/tranporter-schema');

const get = async (req,res)=>{
	try{
		const {_id,name} = req.body;
		if(_id!==undefined){
			const transporter = await TransporterModel.getById(_id);
			return res.send(transporter);
		}
		const transporters = await TransporterModel.getBy({
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