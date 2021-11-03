const User = require('../../Database/user/user-service');
const { SUCCESS_MSG, FAILED } = require('./constants');

const createUser = async (req,res)=>{
	const {name,email,type,password} = req.body;
	const isCreated = await User.create(name,email,type,password);
	if(isCreated) return res.status(201).json({message:SUCCESS_MSG});
	else{
		return res.json({message:FAILED});
	}
};

module.exports = createUser;