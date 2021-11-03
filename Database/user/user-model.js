// this file containes the schema for our users
// the schema is designed then transformed into a mongoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const userSchema = new Schema({
	type : {type :String,required: true},
	email: {type :String,index: {unique: true}, required: true},
	name:{type :String, required: true},
	password: {type:String,require : true }
});
//making a mongoose model and exporting it
const users  = mongoose.model('users',userSchema);
module.exports = users;