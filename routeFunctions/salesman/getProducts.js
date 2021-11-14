const Products  =  require('../../Database/product/product-service');

const getProducts = async (req,res)=> {
	try{
		if(req.query.id){
			const products = await Products.get({_id:req.query.id});
			if(products) return res.json(products);
			return res.sendStatus(404);
		}
		else{
			const products = await Products.get({});
			if(products) return res.json(products);
			return res.sendStatus(404);
		}
	}catch(err){
		//handle err
		return res.sendStatus(500);
	}
};

module.exports = getProducts;