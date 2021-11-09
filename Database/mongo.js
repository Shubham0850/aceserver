//this file connects us to the mongobd database
//this connect function is imported in places where we need to connect
// to the database
const mongoose = require('mongoose');
//assigning the mongoose promise with global promise
// more info on : https://stackoverflow.com/questions/51862570/mongoose-why-we-make-mongoose-promise-global-promise-when-setting-a-mongoo
mongoose.Promise = global.Promise;
//loading the env variables
require('dotenv').config({path:'../config.env'});
//connecting to the data base
function connect(){
	const mongoUri = process.env.DB_URI.replace(
		'<password>',
		process.env.DB_PASSWORD
	);
	try{
		return mongoose.connect(mongoUri,{ useNewUrlParser: true 
			,useUnifiedTopology: true,
			autoIndex: true, });
	}
	catch(err){
		console.log('heere',err);
	}
}
module.exports = {
	connect,
	mongoose
};