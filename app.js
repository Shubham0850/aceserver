const express = require('express');
const cors = require(('cors'));
const app = express();
app.use(express.json());
app.use(cors());
const authenticateAdminToken = require('./Middlewares/authenticateAdminToken');
const getToken = require('./routeFunctions/getToken/getToken');
const Admin = require('./routeFunctions/Admin');
const {createSalesOrder,getSalesorder,updateSalesOrder,deleteSalesOrder} = require('./routeFunctions/salesorder/salesorder');
const{createInward,getInward,updateinward,deleteinward} = require('./routeFunctions/inward/inward');
/////////////////////Routes///////////////////////////////////
//login route
app.get('/',(req,res)=>{
	res.json({message:'hello'});
});
app.post('/login',getToken);
//admin routes (only authenticated admin can fetch this)
app.post('/createuser',authenticateAdminToken, Admin.createUser);

app.post('/createsalesorder',createSalesOrder);
app.get('/getsalesorder',getSalesorder);
app.patch('/updatesalesorder/:id',updateSalesOrder);
app.delete('/deletesalesorder/:id',deleteSalesOrder);

app.post('/createInward',createInward);
app.get('/getinward',getInward);
app.patch('/updateinward/:id',updateinward);
app.delete('/deleteinward/:id',deleteinward);

app.all('*', (req, res) => {
	res.sendStatus(404);
});
module.exports = app;
