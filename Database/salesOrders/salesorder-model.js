const mongoose=require('mongoose')
const validator = require('validator')

const salesOrderSchema = new mongoose.Schema({
    
    salesmanId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    partyId:{
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
    Gst:{
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
            ref:'products'
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
    }],
    selectLedger:{
        type:String,
        trim:true
    },
    Remarks:{
        type:String,
        trim:true
    },
},{
    timestamps:true
})

const Salesorder = mongoose.model('Salesorder',salesOrderSchema)
module.exports = Salesorder