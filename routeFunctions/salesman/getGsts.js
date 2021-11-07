const GST  =  require('../../Database/gst/gst-service');

const getCustomers = async (req,res)=> {
	const gst = await GST.get();
	if(gst) return res.json(gst);
	return res.sendStatus(404);
};

module.exports = getCustomers;