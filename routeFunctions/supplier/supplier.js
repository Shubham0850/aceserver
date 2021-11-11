const Supplier = require('../../Database/supplier/supplier');


//GET /supplier?key=value
//Get/supplier?sortBy=cretedAt:desc  for recent orders
async function getSupplier(req,res){
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
		const party=await Supplier.find(match)
			.sort(sort);
		res.send(party);
	}catch(e){
		res.status(500).send(e);
	}
}

async function  createSupplier(req,res){
	const party = new Supplier(req.body);
	try{
		await party.save();
		return res.status(200).send(party);
	}catch(e){
		return res.status(400).send(e);
	}
}

async function updateSupplier(req,res){
	try{
		const updates = Object.keys(req.body);
		const party = await Supplier.findOne({ _id:req.params.id });
		if(!party){
			return res.status(404).send();
		}
		updates.forEach(update=>party[update]=req.body[update]);
		await party.save();
		res.send(party);
	}catch(e){
		res.status(400).send(e);

	}
}

async function deleteSupplier(req,res){
	try{
		const party = await Supplier.findOneAndDelete({_id:req.params.id});
		if(!party)
			return res.status(404).send();
		res.send(party);
	}catch(e){
		res.status(500).send();
	}
}

module.exports = {
	createSupplier,
	getSupplier,
	updateSupplier,
	deleteSupplier
};