const User = require('../../Database/user/user-service');
const getUser = async (req,res)=>{
	const {name,email} = req.body;
	const users = await User.getBy({name: { $regex: name, $options: '-i'},
		email:{ $regex: email, $options: '-i'}});
	return res.json({users});
};

module.exports = getUser;