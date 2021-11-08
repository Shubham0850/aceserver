const User = require('../../Database/user/user-model');
const { SUCCESS_MSG } = require('./constants');

const deleteUser = async (req,res)=>{
	try{
		const {_id} = req.body;
		await User.deleteOne({_id});
		return res.json({message: SUCCESS_MSG});
	}catch(err){
		//handle err
		res.sendStatus(500);
	}

};

module.exports = deleteUser;