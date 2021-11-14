const User = require('../../Database/user/user-service');
const getUser = async (req,res)=>{
	const {id,name,email} = req.query;
	if(id!==undefined){
		const user = await User.getById(id);
		return res.send(user);
	}
	const users = await User.getBy({
		name: { $regex: (name==undefined)?'':name, $options: '-i'},
		email:{ $regex: (email==undefined)?'':email, $options: '-i'}});
	return res.json(users);
};

module.exports = getUser;