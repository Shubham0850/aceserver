const express = require('express');
const router = new express.Router();
const salesOrder = require('../../Database/salesOrders/salesorder-model.js');


//GET /salesorder?status=dispatch
//GET/salesorder?limit=10&skip=20
//Get/salesorder?sortBy=cretedAt:desc  for recent orders
router.get('/salesorder',async(req,res)=>{
	const match ={};
	const sort={};
	if(req.query.status)
	{
		match.status=req.query.status;
	}
	if(req.query.sortBy){
		const parts=req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1:1;
	}
	try{
		const orders=await salesOrder.find(match)
			.limit(parseInt(req.query.limit))
			.skip(parseInt(req.query.skip))
			.sort(sort);
		res.send(orders);
	}catch(e){
		res.status(500).send(e);
	}
});

router.post('/createorder',async (req,res)=>{
	const order = new salesOrder(req.body);
	try{
		await order.save();
		return res.status(201).send(order);
	}catch(e){
		return res.status(400).send(e);
	}
 
});

module.exports = router;