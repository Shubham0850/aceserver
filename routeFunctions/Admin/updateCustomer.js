const Customer = require('../../Database/customer/customer-model');
const filterUndefinedandEmpty = require('../../Helpers/filter/filterUndefinedandEmpty');
const { SUCCESS_MSG, FAILED } = require('./constants');

const updateCustomer = async (req,res)=>{
	try{
		const {
			_id,
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
			accounts
		} = req.body;
		const updatedData = filterUndefinedandEmpty({
			_id,
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
			accounts
		});
		await Customer.findByIdAndUpdate({_id},{
			$set:updatedData
		});
		return res.json({message:SUCCESS_MSG});

	}catch(err){
		return res.json({message:FAILED});
	}
};

module.exports = updateCustomer;