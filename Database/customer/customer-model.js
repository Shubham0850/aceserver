// this file containes the schema for our users
// the schema is designed then transformed into a mongoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const customerSchema = new Schema({
	branch: {type: String},
	code: {type: Number},
	group: {type: String},
	name : {type: String},
	contactPersonName: {type: String},
	contactNumber: {type: String},
	email: {type :String},
	salesPerson : {type:String},
	creditDays: {type: Number},
	creditLimit : {type: Number},
	gstType: {type: String},
	gstNumber: {type:String},
	state: {type:String},
	address : {type: String},
	blocking: {type: Boolean,default:false},
	billType: {type: String},
	openingAmount : {type: Number,default:0}
});
//making a mongoose model and exporting it
const customers  = mongoose.model('customer',customerSchema);
module.exports = customers;