const mongoose=require('mongoose');

const inwardSchema = new mongoose.Schema({
    
	salesman:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},
	party:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'supplier'
	},
	invoiceNo:{
		type:String,
		trim:true
	},
	voucherNo:{
		type:String,
		trim:true
	},
	voucherDate:{
		type:Date,
	},
	status:{
		type:String,
		trim:true
	},
	branch:{
		type:String,
		trim:true
	},
	dispatchedTo:{
		type:String,
		trim:true
	},
	transporterName:{
		type:String,
		trim:true
	},
	marka:{
		type:Number,
	},
	account:{
		type:String,
		trim:true
	},
	getNo:{
		type:String,
		trim:true
	},
	defaultDisc:{
		type:Number,
		trim:true
	},
	godown:{
		type:String,
		trim:true
	},
	items:[{
		itemId:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'products',
		},
		rate:{
			type: Number,
			default:0
		},
		masterPack:{
			type: Number,
			default:0
		},
		subMasterPack:{
			type: Number,
			default:0
		},
		masterPackQuantity:{
			type: Number,
			default:0
		},
		subMasterPackQuantity:{
			type: Number,
			default:0
		},
		loose: {
			type: Number,
			default:0
		},
		discountPercentage:{
			type: Number,
			default:0
		},
		grossAmount:{
			type: Number,
			default:0
		},
		igst:{
			type: Number,
			default:0
		}, 
		cgst:{
			type: Number,
			default:0
		}, 
		sgst:{
			type: Number,
			default:0
		},
		cess:{
			type: Number,
			default:0
		}, 
	}],
	remarks:{
		type:String,
		trim:true
	},
},{
	timestamps:true
});

const inward = mongoose.model('inward',inwardSchema);
module.exports = inward;