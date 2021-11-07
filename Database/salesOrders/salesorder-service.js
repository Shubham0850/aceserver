const salesOrder = require('./orderModel');

const createSalesOrder = async (req,res)=>{
	const order = new salesOrder(req.body);
	try{
		await order.save();
		return res.status(201).send(order);
	}catch(e){
		return res.status(400).send(e);
	}
 
};

module.exports={
	createSalesOrder
};