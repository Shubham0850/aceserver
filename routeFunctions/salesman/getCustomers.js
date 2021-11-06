const Customers  =  require('../../Database/customer/customer-service');

const getCustomers = async (req,res)=> {
	const customers = await Customers.get();
	if(customers) return res.json(customers);
	return res.sendStatus(404);
};

module.exports = getCustomers;