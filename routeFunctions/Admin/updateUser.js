const User = require('../../Database/user/user-service');
const filterUndefinedandEmpty = require('../../Helpers/filter/filterUndefinedandEmpty');
const { FAILED, SUCCESS_MSG } = require('./constants');
const updateUser = async (req,res)=>{
	const {_id,name,email,password,type} = req.body;
	const updateData = filterUndefinedandEmpty({name,email,password,type});
	const updatedUser = await User.updateById(_id,updateData);
	if(updatedUser!=false) return res.json({message:SUCCESS_MSG,user:updateUser});
	return res.json({message:FAILED});
};

module.exports = updateUser;