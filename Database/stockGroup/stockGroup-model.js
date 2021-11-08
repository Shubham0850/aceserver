// this file containes the schema for our users
// the schema is designed then transformed into a mongoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const stockGroupSchema = new Schema({
	name: {type: String,index: {unique: true}, required: true}
}

);
//making a mongoose model and exporting it
const stockGroups  = mongoose.model('stockGroups',stockGroupSchema);
module.exports = stockGroups;