const TransporterModel = require('../../Database/transporter/tranporter-schema');
const filterUndefinedandEmpty = require('../../Helpers/filter/filterUndefinedandEmpty');

const updateTransporter = async (req,res)=>{
	try{
		const {name,phoneNumber,email,description} = req.body;
		const updatedData = filterUndefinedandEmpty({name,phoneNumber,email,description});
		await TransporterModel.findByIdAndUpdate({_id:req.params.id},{
			$set: updatedData
		});
		res.json({message:'success'});
	}catch(err){
		//handle err
	}
};

module.exports = updateTransporter;