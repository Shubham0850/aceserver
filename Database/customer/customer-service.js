const customers = require('./customer-model');
const ReadPreference = require('mongodb').ReadPreference;
require('../mongo').connect();
function getByEmail(email){
	return customers.findOne({email});
}

async function create(
	branch='',
	code,
	group='',
	name ='',
	contactPersonName='',
	contactNumber='',
	email='',
	salesPerson='',
	creditDays='',
	creditLimit ='',
	gstType='',
	gstNumber='',
	state='',
	address ='',
	blocking=false,
	billType='',
	openingAmount=0){
	const customer = new customers({branch,
		code,
		group,
		name ,
		contactPersonName,
		contactNumber,
		email,
		group,
		salesPerson,
		creditDays,
		creditLimit ,
		gstType,
		gstNumber,
		state,
		address ,
		blocking,
		billType,
		openingAmount});
	customer.save().then(()=>{
		return true;
	}).catch((err) => {
		console.error(err);
	});
}

//exporting both of the function to use in the server 
module.exports = {
	getByEmail,create
};