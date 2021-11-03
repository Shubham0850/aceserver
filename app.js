const express = require('express');
const jwt =  require('jsonwebtoken');
const app = express();
app.use(express.json());
const Users = require('./Database/user/user-service');
const isAuthinticated = require('./Helpers/authentication/authenticate');
const authenticateAdminToken = require('./Middlewares/authenticateAdminToken');
const authenticateToken = require('./Middlewares/authenticateToken');

// Routes
app.post('/login',async (req,res)=>{
	const providedEmail = req.body.email;
	const providedPwd = req.body.password;
	const user = await isAuthinticated(providedEmail,providedPwd);
	if(!user) res.sendStatus(401);
	const accessToken = jwt.sign(user,process.env.JWT_SECRET);
	res.json({...user,accessToken});
});



app.all('*', (req, res, next) => {
	res.sendStatus(404);
});
module.exports = app;
