const filterUndefinedandEmpty = (obj)=>{
	var filteredObj = {};
	for(const key in obj){
		if(obj[key]!==undefined && obj[key]!==null){
			filteredObj[key] = obj[key];
		}
	}
	return filteredObj;
};

module.exports = filterUndefinedandEmpty;