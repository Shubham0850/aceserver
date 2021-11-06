// this file containes the schema for our users
// the schema is designed then transformed into a mongoose model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const gstSchema = new Schema({
	applicableFrom : {type : Date,required: true},
	description : {type: String},
	calcType : {type: String},
	taxability : {type: String},
	revrChrg: {type : Boolean},
	iGst : {type : Number},
	cGst : {type : Number},
	sGst : {type : Number},
	cess : {type : Number},

});
//making a mongoose model and exporting it
const gst  = mongoose.model('gst',gstSchema);
module.exports = gst;