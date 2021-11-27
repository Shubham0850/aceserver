const GST = require('./gst-model');
async function get(){
	try{
		const gsts = await GST.find({});
		return gsts;
	}
	catch(err){
		//handle err
	}
}

async function create({name,applicableFrom,description,taxabilty,calcType,revrChrg,iGst,cGst,sGst,cess}){
	try{
		const gst = new GST({
			name,
			applicableFrom,
			description,
			calcType,
			revrChrg,
			taxabilty,

			iGst,
			cGst,
			sGst,
			cess});
	
		await gst.save();
		return true;
	}catch (err){
		return false;
	}
}

module.exports = {
	create,get
};