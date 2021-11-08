const inward = require('../../Database/inward/inward.js');


//GET /inward?status=dispatch
//Get/inward?sortBy=cretedAt:desc  for recent orders
async function getInward(req,res){
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
		const orders=await inward.find(match)
			.sort(sort);
		res.send(orders);
	}catch(e){
		res.status(500).send(e);
	}
}

async function  createInward(req,res){
	const order = new inward(req.body);
	try{
		await order.save();
		return res.status(200).send(order);
	}catch(e){
		return res.status(400).send(e);
	}
}

async function updateinward(req,res){
	try{
		const updates = Object.keys(req.body);
		const order = await inward.findOne({ _id:req.params.id });
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

async function deleteinward(req,res){
	try{
		const order = await inward.findOneAndDelete({_id:req.params.id});
		if(!order)
			return res.status(404).send();
		res.send(order);
	}catch(e){
		res.status(500).send();
	}
}

module.exports = {
	createInward,
	getInward,
	updateinward,
	deleteinward
};