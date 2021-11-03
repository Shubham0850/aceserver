const jwt = require('jsonwebtoken');
const {ADMIN} = require('./coinstants');
const authenticateAdminToken = (req,res,next)=>{
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err || user.type !== ADMIN) return res.sendStatus(403);
		req.user = user;
		next();
	});
};
module.exports = authenticateAdminToken;