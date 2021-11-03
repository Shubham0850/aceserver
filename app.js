const express = require('express');
const app = express();
app.use(express.json());
const authenticateAdminToken = require('./Middlewares/authenticateAdminToken');
const getToken = require('./routeFunctions/getToken/getToken');
const Admin = require('./routeFunctions/Admin');
/////////////////////Routes///////////////////////////////////
//login route
app.get('/',(req,res)=>{
	res.json({message:'hello'});
});
app.post('/login',getToken);
//admin routes (only authenticated admin can fetch this)
app.post('/createuser',authenticateAdminToken, Admin.createUser);


app.all('*', (req, res) => {
	res.sendStatus(404);
});
module.exports = app;
