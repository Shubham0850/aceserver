const users = require('./user-model');
require('../mongo').connect();
async function getBy(query){
	return await users.find(query);
}
function getByEmail(email){
	return users.findOne({email});
}
async function create(name,email,type,password){
	const user = new users({name,email,type,password});
	try{
		await user.save();
		return true;
	}catch (err){
		return false;
	}
}

//exporting both of the function to use in the server 
module.exports = {
	getByEmail,create,getBy
};