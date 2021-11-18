const get6digits = (n)=>{
	if(n<10){
		return '00000' + n.toString();
	}
	if(n<100){
		return '0000' + n.toString();
	}	
	if(n<1000){
		return '000' + n.toString();
	}	
	if(n<10000){
		return '00' + n.toString();
	}	
	if(n<100000){
		return '0' + n.toString();
	}	
	return n.toString();
};
module.exports = get6digits;