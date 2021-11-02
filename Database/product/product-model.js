// this file containes the schema for our users
// the schema is designed then transformed into a mongoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const productSchema = new Schema({
	branch : {type: String},
	itemName  : {type: String},
	price  : {type: Number},
	rate   : {type: Number},
	stockGroup   : {type: String},
	stockCatagory : {type: String},
	opening: {type: Number},
	inward : {type: Number},
	sales  : {type: Number},
	transfer   : {type: Number},
	closing: {type: Number},
	masterPackQuantity   : {type: Number},
	SubMasterPackQuantity   : {type: Number},
}
    
);
//making a mongoose model and exporting it
const products  = mongoose.model('products',productSchema);
module.exports = products;