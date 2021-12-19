const mongoose=require('mongoose');

const supplierSchema = new mongoose.Schema({
	blocking:{
		type:Boolean,
		default:false
	},
	branch:{
		type:String,
		trim:true
	},
	name:{// required
		type:String,
		trim:true
	},
	code:{
		type:Number
	},
	group:{// required
		type:String,
		trim:true
	},
	contactPerson:{// required
		type:String,
		trim:true
	},
	contactMobile:{// required
		type:Number
	},
	email:{// required
		type:String,
		trim:true
	},
	salesPerson:{
		type:String,
		trim:true
	},
	creditDays:{
		type:Number
	},
	creditLimit:{
		type:Number
	},
	gstType:{// required
		type:String,
		trim:true
	},
	gstNo:{// required
		type:String,
		trim:true
	},
	state:{// required
		type:String,
		trim:true
	},
	address:{// required
		type:String,
		trim:true
	}
},{
	timestamps:true
});

const Supplier = mongoose.model('suppliers',supplierSchema);
module.exports = Supplier;