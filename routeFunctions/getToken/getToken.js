const jwt = require('jsonwebtoken');
const isAuthinticated = require('../../Helpers/authentication/authenticate');
const getToken = async (req,res)=>{
	const providedEmail = req.body.email;
	const providedPwd = req.body.password;
	const user = await isAuthinticated(providedEmail,providedPwd);
	if(!user) {
		return res.sendStatus(401);
	}
	const accessToken = jwt.sign(user,process.env.JWT_SECRET);
	res.json({...user,accessToken});
};
module.exports = getToken;