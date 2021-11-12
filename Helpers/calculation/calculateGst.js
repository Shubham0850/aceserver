const calculateGst = ({amount=0,cgst=0,sgst=0,igst=0,cess=0})=>{
	return (amount*cgst)/100 +  (amount*sgst)/100+(amount*igst)/100+(amount*cess)/100;
};

module.exports = calculateGst;