const products = require('./product-model');
const ReadPreference = require('mongodb').ReadPreference;
require('../mongo').connect();

async function create(	
	branch='',
	itemName='',
	price='',
	rate ='',
	stockGroup ='',
	stockCatagory='',
	opening='',
	inwar='',
	sales='',
	transfer ='',
	closing='',
	masterPackQuantity =0,
	SubMasterPackQuantity =0,){
	const product = new products({
		branch,
		itemName,
		price,
		rate ,
		stockGroup ,
		stockCatagory,
		opening,
		inwar,
		sales,
		transfer ,
		closing,
		masterPackQuantity,
		SubMasterPackQuantity});
	product.save().then(()=>{
		return true;
	}).catch((err) => {
		console.error(err);
	});
}

//exporting both of the function to use in the server 
module.exports = {
	create
};