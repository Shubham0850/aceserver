const Customer = require('../../Database/customer/customer-service');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createCustomer = async (req,res)=>{
	const {
		branch,
		ledgerGroup,
		name ,
		contactPersonName,
		contactNumber,
		email,
		creditDays,
		creditLimit ,
		gstType,
		gstNumber,
		state,
		pincode,
		address ,
		blocking,
		billType,
		acounts
	} = req.body;
	const salesPerson = req.user._id;
	const isCreated = await Customer.create({
		branch,
		ledgerGroup,
		name ,
		contactPersonName,
		contactNumber,
		email,
		salesPerson,
		creditDays,
		creditLimit ,
		gstType,
		gstNumber,
		state,
		pincode,
		address ,
		blocking,
		billType,
		acounts
	});
	if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
	else{
		return res.json({message:FAILED});
	}
};

module.exports = createCustomer;