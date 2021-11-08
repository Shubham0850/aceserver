const salesOrder = require('../../Database/salesOrders/salesorder-model.js');


//GET /salesorder?status=dispatch
//Get/salesorder?sortBy=cretedAt:desc  for recent orders
async function getSalesorder(req,res){
	const match ={};
	const sort={};
	if(req.query.status)
	{
		match.status=req.query.status;
	}
	if(req.query.sortBy){
		const parts=req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1:1;
	}
	try{
		const orders=await salesOrder.find(match)
			.sort(sort);
		res.send(orders);
	}catch(e){
		res.status(500).send(e);
	}
}

async function  createSalesOrder(req,res){
	const order = new salesOrder(req.body);
	try{
		await order.save();
		return res.status(201).send(order);
	}catch(e){
		return res.status(400).send(e);
	}
}

async function updateSalesOrder(req,res){
	try{
		const updates = Object.keys(req.body);
		const order = await salesOrder.findOne({ _id:req.params.id });
		if(!order){
			return res.status(404).send();
		}
		updates.forEach(update=>order[update]=req.body[update]);
		await order.save();
		res.send(order);
	}catch(e){
		res.status(400).send(e);

	}
}

async function deleteSalesOrder(req,res){
	try{
		const order = await salesOrder.findOneAndDelete({_id:req.params.id});
		if(!order)
			return res.status(404).send();
		res.send(order);
	}catch(e){
		res.status(500).send();
	}
}


module.exports = {
	createSalesOrder,
	getSalesorder,
	updateSalesOrder,
	deleteSalesOrder
};