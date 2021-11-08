const customers = require('./customer-model');
require('../mongo').connect();
async function get(){
	try{
		const Customers = await customers.find({}).populate('salesPerson','name email');
		return Customers;
	}catch(err){
		//handle err
	}
}

async function create({
	branch='',
	ledgerGroup='',
	name='',
	contactPersonName='',
	contactNumber='',
	email='',
	salesPerson,
	creditDays='',
	creditLimit='',
	gstType='',
	gstNumber='',
	state='',
	address='',
	pincode='',
	blocking=false,
	billType='',
	accounts=[]
}){
	try{
		const customer = new customers({
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
		await customer.save();
		return true;
	}catch(err){
		//handle err
	}
}

//exporting both of the function to use in the server 
module.exports = {
	get,create
};