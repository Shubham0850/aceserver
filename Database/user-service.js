const users = require('./user-model');
const ReadPreference = require('mongodb').ReadPreference;
require('./mongo').connect();
function getByEmail(email){
	return users.findOne({email});
}
async function create(name,email,type,password){
	const user = new users({name,email,type,password});
	user.save().then(()=>{
		return true;
	}).catch((err) => {
		console.error(err);
	});
}

//exporting both of the function to use in the server 
module.exports = {
	getByEmail,create
};