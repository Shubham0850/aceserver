// this file containes the schema for our users
// the schema is designed then transformed into a mongoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const productSchema = new Schema({
	name  : {type: String,index:{unique:true}},
	description: {type: String},
	modelNo : {type : String},
	partNo : {type: String},
	price   : {type: Number},
	stockGroup   : {type: mongoose.Schema.Types.ObjectId, ref:'stockGroups'},
	stockCatagory : {type: mongoose.Schema.Types.ObjectId, ref:'stockCatagorys'},
	hsn : {type: String},
	gst: {type: mongoose.Schema.Types.ObjectId, ref:'gst'},
	barCodeNo: {type:String},
	tallyName: {type:String},
	brand:{type: mongoose.Schema.Types.ObjectId, ref:'brands'},
	UOM : {type: String},
	packSize : {type: Number},
	weight : {type: Number},
	CBM : {type: Number},
}
);
//making a mongoose model and exporting it
const products  = mongoose.model('products',productSchema);
module.exports = products;