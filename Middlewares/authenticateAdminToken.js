const jwt = require('jsonwebtoken');
const {ADMIN} = require('./coinstants');
const authenticateAdminToken = (req,res,next)=>{
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		err && console.log(err);
		if (err) return res.sendStatus(403);
		if(user.type === ADMIN){
			req.user = user;
			next();
		}
		res.sendStatus(403);
	});
};
module.exports = authenticateAdminToken;