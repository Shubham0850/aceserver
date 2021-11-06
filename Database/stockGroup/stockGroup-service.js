const stockGroups = require('./stockGroup-model');
require('../mongo').connect();

async function create(name){
	const stockGroup = new stockGroups({name});
	try{
		await stockGroup.save();
		return true;
	}catch (err){
		return false;
	}
}

module.exports = {
	create
};