const Products  =  require('../../Database/product/product-service');

const getProducts = async (req,res)=> {
	const products = await Products.get();
	if(products) return res.json(products);
	return res.sendStatus(404);
};

module.exports = getProducts;