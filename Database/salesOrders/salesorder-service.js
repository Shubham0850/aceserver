
const get6digits = require('../../Helpers/get6digits');
const SalesOrderModel = require('./salesorder-model');
const createVoucherNumber = async ()=>{
	var todaysSalesOrder = await gettodaysSalesOrders();
	if(!todaysSalesOrder) {
		todaysSalesOrder = [];
	}
	var todaysSalesOrderNumber = todaysSalesOrder.length;
	const date = new Date();
	const ddmmyyyy = date.getDate().toString() + (date.getMonth()+1).toString() + date.getFullYear().toString();
	var isExists = await SalesOrderModel.findOne({voucherNo: 'sale/'+ddmmyyyy+'/'+get6digits(todaysSalesOrderNumber++)});
	while(isExists){
		isExists = await SalesOrderModel.findOne({voucherNo: 'sale/'+ddmmyyyy+'/'+get6digits(todaysSalesOrderNumber)});
		if(isExists) todaysSalesOrderNumber++;
	}
	return 'sale/'+ddmmyyyy+'/'+get6digits(todaysSalesOrderNumber);
};

const gettodaysSalesOrders = async ()=>{
	try{
		var start = new Date();
		start.setHours(0,0,0,0);
		var end = new Date();
		end.setHours(23,59,59,999);
		const stocksOfToday = await SalesOrderModel.find({createdAt: {$gte: start, $lt: end}});
		return stocksOfToday;
	}catch(err){
		//handle err
	}
};

module.exports = {
	createVoucherNumber,
};