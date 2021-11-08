const Brand = require('./brand-model');
require('../mongo').connect();

async function create(name){
	try{
		const brand = new Brand({name});
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