const InwardModel = require('./inward');

const chngStatus = async  ({_id,status})=>{
	try{
		await InwardModel.findByIdAndUpdate({_id},{
			$set: {
				status,
			}
		});
		return true;

	}
	catch(err){
		//handle err
		return false;
	}
};
module.exports = {
	chngStatus
};