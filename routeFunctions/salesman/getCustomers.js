const Customers  =  require('../../Database/customer/customer-service');

const getCustomers = async (req,res)=> {
	try{
		if(req.query.id){
			const customers = await Customers.get({_id:req.query.id});
			if(customers) return res.json(customers);
			return res.sendStatus(404);
		}
		else{
			const customers = await Customers.get({});
			if(customers) return res.json(customers);
			return res.sendStatus(404);
		}
	}catch(err){
	//handle err
		return res.sendStatus(505);
	}
};

module.exports = getCustomers;