const Supplier = require('../../Database/supplier/supplier');


//GET /supplier
//Get/supplier?sortBy=cretedAt:desc  for recent orders
async function getSupplier(req,res){
	try{
		if(req.query.id){
			const party=await Supplier.findById({_id:req.query.id});
			return res.send(party);
		}else{
			const party=await Supplier.find({});
			return res.send(party);
		}
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