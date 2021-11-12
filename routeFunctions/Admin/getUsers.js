const User = require('../../Database/user/user-service');
const getUser = async (req,res)=>{
	const {_id,name,email} = req.body;
	if(_id!==undefined){
		const user = await User.getById(_id);
		return res.send(user);
	}
	const users = await User.getBy({
		name: { $regex: (name==undefined)?'':name, $options: '-i'},
		email:{ $regex: (email==undefined)?'':email, $options: '-i'}});
	return res.json(users);
};

module.exports = getUser;