const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const transporterSchema = new Schema({
	email: {type :String},
	name:{type :String},
	phoneNumber: {type:String},
	description: {type:String}
});
//making a mongoose model and exporting it
const users  = mongoose.model('transporters',transporterSchema);
module.exports = users;