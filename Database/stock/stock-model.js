const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const stockSchema = new Schema({
	inwardFrom : {type: mongoose.Schema.ObjectId, ref:'inward'},
	godown: {type: String},
	productId:{type: mongoose.Types.ObjectId,
		ref:'products'            
	},
	branch:{type: String},
	code: {type:String},
	quantity: {type:Number},
	dispatchedIn: {type: mongoose.Schema.ObjectId,ref:'salesorder'},
	isPrinted: {type: Boolean,default:false}
},{timestamps:true});
//making a mongoose model and exporting it
const stock  = mongoose.model('stock',stockSchema);
module.exports = stock;