const SalesorderModel = require('../../Database/salesOrders/salesorder-model.js');
const calculateGst = require('../../Helpers/calculation/calculateGst.js');
const StockService = require('../../Database/stock/stock-service');
const CustomerServices = require('../../Database/customer/customer-service');
const { PENDING_CONFIRMATION, CONFIRMED, SUCCESS, FAILED, DISPATCHED } = require('./constants.js');
const filterUndefinedandEmpty = require('../../Helpers/filter/filterUndefinedandEmpty.js');
const SalesOrderService = require('../../Database/salesOrders/salesorder-service');

//GET /salesorder?status=dispatch
//Get/salesorder?sortBy=cretedAt:desc  for recent orders
async function getSalesorder(req,res){
	const match ={};
	if(req.query.status)
	{
		match.status=req.query.status;
	}
	try{
		if(req.query.id){
			const orders=await SalesorderModel.findById({_id:req.query.id})
				.populate('party','name')
				.populate('salesman','name email')
				.populate('items.productId','name');
			return res.send(orders);
		}
		else{
			const orders=await SalesorderModel.find(match)
				.populate('party','name')
				.populate('salesman','name email')
				.populate('items.productId','name');
			return res.send(orders);
		}
	}catch(e){
		res.status(500).send(e);
	}
}

async function  createSalesOrder(req,res){
	const voucherNo = await SalesOrderService.createVoucherNumber();
	const order = new SalesorderModel({
		...req.body,
		salesman:req.user._id,
		voucherNo
	});
	try{
		await order.save();
		return res.status(201).send(order);
	}catch(e){
		return res.status(400).send(e);
	}
}

async function updateSalesOrder(req,res){
	try{
		const updates = filterUndefinedandEmpty(req.body);
		await SalesorderModel.findOneAndUpdate({ _id:req.params.id },{
			$set: updates
		});
		return res.json({message:'success'});
	}catch(e){
		//handle err
		return res.status(400).send(e);

	}
}

async function deleteSalesOrder(req,res){
	try{
		const order = await SalesorderModel.findOneAndDelete({_id:req.params.id});
		if(!order)
			return res.status(404).send();
		res.send(order);
	}catch(e){
		res.status(500).send();
	}
}
async function calculateTotalAmount(salesorder){
	var totalAmount = 0;
	for(let key in salesorder.items){
		console.log(key);
		let item = salesorder.items[key];
		const quantity = item.quantity;
		let taxes = calculateGst({amount: quantity*item.rate,
			sgst:item.sgst,
			igst:item.igst,
			cgst:item.cgst,
			cess:item.cess
		});
		totalAmount = totalAmount + quantity*item.rate + taxes;
	}
	return totalAmount;
}

async function confirmSalesOrder(req,res){
	try{
		const salesorderId = req.params.id;

		const prevOrder = await SalesorderModel.findOneAndUpdate({_id:salesorderId},{
			$set:{
				status:CONFIRMED
			}
		});
		if(prevOrder.status!==PENDING_CONFIRMATION){
			return res.json({message:FAILED});
		}
		const order = await SalesorderModel.findById({_id:salesorderId});
		console.log(order.items);
		const totalAmount = await calculateTotalAmount(order);
		await CustomerServices.addIntoLedger({
			_id:order.party,
			type:'purchase',
			depositType:'Cr',
			amount:totalAmount
		});
		return res.json({message:SUCCESS});
	}catch(err){
		res.sendStatus(500);
	}
}

async function dispatch(req,res){
	try{
		const orderId = req.params.id;
		const {items} = req.body;
		const order = await SalesorderModel.findByIdAndUpdate({_id:orderId},{
			$set:{
				items,
				status:DISPATCHED
			}
		});
		for(let key in items){
			var quantityWithOutLoose = 0;
			let item = items[key];
			for(let i in item.dispatchedBatches){
				let code = item.dispatchedBatches[i];
				if(code!=='loose') {
					quantityWithOutLoose += await StockService.getQuantity({code});
					await StockService.decrementStock({code});

				}
			}
			if(item.quantity!==quantityWithOutLoose){
				await StockService.decrementStock({code:'loose',
					quantity:item.quantity - quantityWithOutLoose,
					branch:order.branch,
					godown:order.godown
				});
			}
		}

		return res.json({message:SUCCESS});
	}catch(err){
		//handle err
		return res.sendStatus(500);
	}
}

module.exports = {
	createSalesOrder,
	getSalesorder,
	updateSalesOrder,
	deleteSalesOrder,
	confirmSalesOrder,
	dispatch
};