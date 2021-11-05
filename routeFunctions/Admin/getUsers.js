const User = require('../../Database/user/user-service');

const getUser = async (req,res)=>{
	const {name,email,type,password} = req.body;
	const users = await User.getBy({name,email,type,password});
	return res.json(users);
};

module.exports = getUser;