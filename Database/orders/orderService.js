const salesOrder = require('./orderModel');

const createSalesOrder = async (req,res)=>{
    const order = new salesOrder(req.body)
     try{
         await order.save()
         res.status(201).send(order)
     }catch(e){
         res.status(400).send(e)
     }
 
 }
 module.exports={
     createSalesOrder
 };