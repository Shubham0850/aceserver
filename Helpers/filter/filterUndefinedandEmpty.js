const filterUndefinedandEmpty = (obj)=>{
	var filteredObj = {};
	for(const key in obj){
		if(obj[key]!==undefined && obj[key]!==''){
			filteredObj[key] = obj[key];
		}
	}
	return filteredObj;
};

module.exports = filterUndefinedandEmpty;