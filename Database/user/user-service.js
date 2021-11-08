const users = require('./user-model');
require('../mongo').connect();
async function getBy(query){
	try{
		return await users.find(query);
	}catch(err){
		//handle err
	}
}
async function getById(_id){
	try{
		return await users.findById({_id});
	}catch(err){
		//handle err
	}
}
async function getByEmail(email){
	try{
		return await users.findOne({email});
	}
	catch(err){
		return null;
	}
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
async function updateById(_id,updateData){
	try{
		const updatedUser = await users.findByIdAndUpdate({_id},{
			$set:updateData});
		return updatedUser;
	}catch(err){
		return false;
	}
}
//exporting both of the function to use in the server 
module.exports = {
	getByEmail,create,getBy,updateById,getById
};