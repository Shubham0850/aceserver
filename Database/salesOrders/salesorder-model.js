const mongoose=require('mongoose');

const salesOrderSchema = new mongoose.Schema({
    
	salesman:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'users'
	},
	party:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'customers'
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
	Marka:{
		type:String,
		trim:true
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
	item:[{
		itemId:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'products',

		},
		rate:{
			type:Number
		},
		quantity:{
			type:Number
		},
		discountPercentage:{
			type:Number
		},
		grossAmount:{
			type:Number
		},
		igst:{
			type:Number
		}, 
		cgst:{
			type:Number
		}, 
		sgst:{
			type:Number
		},
		cess:
        {
        	type:Number
        }   
	}],
	Remarks:{
		type:String,
		trim:true
	},
},{
	timestamps:true
});

const Salesorder = mongoose.model('Salesorder',salesOrderSchema);
module.exports = Salesorder;