const get6digits = require('../../Helpers/get6digits');
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

const createVoucherNumber = async ()=>{
	var todaysInward = await getTodaysInwards();
	if(!todaysInward) {
		todaysInward = [];
	}
	var todaysInwardLength = todaysInward.length;
	const date = new Date();
	const ddmmyyyy = date.getDate().toString() + (date.getMonth()+1).toString() + date.getFullYear().toString();
	var isExists = await InwardModel.findOne({voucherNo: 'inw/'+ddmmyyyy+'/'+get6digits(todaysInwardLength++)});
	while(isExists){
		isExists = await InwardModel.findOne({voucherNo: 'inw/'+ddmmyyyy+'/'+get6digits(todaysInwardLength)});
		if(isExists) todaysInwardLength++;
	}
	return 'inw/'+ddmmyyyy+'/'+get6digits(todaysInwardLength);
};

const getTodaysInwards = async ()=>{
	try{
		var start = new Date();
		start.setHours(0,0,0,0);
		var end = new Date();
		end.setHours(23,59,59,999);
		const stocksOfToday = await InwardModel.find({createdAt: {$gte: start, $lt: end}});
		return stocksOfToday;
	}catch(err){
		//handle err
	}
};
module.exports = {
	chngStatus,
	createVoucherNumber
};