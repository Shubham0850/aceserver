// this file containes the schema for our users
// the schema is designed then transformed into a mongoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const accountSchema = new Schema({
	accountName: {type: String},
	address : {type : String},
	state: {type: String},
	pincode : {type: String},
	gstNumber : {type : String}
});

const customerSchema = new Schema({
	branch: {type: String},
	ledgerGroup: {type: String},
	name : {type: String,index: {unique: true},required:true},
	contactPersonName: {type: String},
	contactNumber: {type: String},
	email: {type :String},
	salesPerson : {type: mongoose.Schema.Types.ObjectId,ref:'users'},
	creditDays: {type: Number},
	creditLimit : {type: Number},
	gstType: {type: String},
	gstNumber: {type:String},
	state: {type:String},
	address : {type: String},
	pincode :{type: String},
	blocking: {type: Boolean,default:false},
	billType: {type: String},
	accounts: [accountSchema]
});
//making a mongoose model and exporting it
const customers  = mongoose.model('customer',customerSchema);
module.exports = customers;