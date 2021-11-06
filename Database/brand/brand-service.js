const Brand = require('./brand-model');
require('../mongo').connect();

async function create(name){
	const brand = new Brand({name});
	try{
		await brand.save();
		return true;
	}catch (err){
		return false;
	}
}

async function get(){
	try{
		const brand = await Brand.find({});
		return brand;
	}catch(err){
		//handle err
	}
}

module.exports = {
	create,
	get
};