const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Designing the schema
const stockSchema = new Schema({
	productId:{type: mongoose.Types.ObjectId,
		ref:'products'            
	},
	branch:{type: String},
	opening: {type: Number},
	inward: {type : Number},
	sell: {type: Number}
});
//making a mongoose model and exporting it
const users  = mongoose.model('stock',stockSchema);
module.exports = users;