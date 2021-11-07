const Brand  =  require('../../Database/brand/brand-service');

const getCustomers = async (req,res)=> {
	const brands = await Brand.get();
	if(brands) return res.json(brands);
	return res.sendStatus(404);
};

module.exports = getCustomers;