const express = require('express');
const cors = require(('cors'));
const app = express();
app.use(express.json());
app.use(cors());
const authenticateToken = require('./Middlewares/authenticateToken');
const authenticateAdminToken = require('./Middlewares/authenticateAdminToken');
const getToken = require('./routeFunctions/getToken/getToken');
const admin = require('./routeFunctions/Admin');
const salesMan = require('./routeFunctions/salesman');
/////////////////////Routes///////////////////////////////////
//login route
app.get('/',(req,res)=>{
	res.json({message:'hello'});
});
app.post('/login',getToken);
//admin routes (only authenticated admin can fetch this)
app.post('/createuser',authenticateAdminToken, admin.createUser);
app.post('/updateuser',authenticateAdminToken,admin.updateUser);
app.post('/createcustomer',authenticateAdminToken,admin.createCustomer);
app.post('/createproduct',authenticateAdminToken,admin.createProduct);
app.post('/creategst',authenticateAdminToken,admin.createGst);
app.post('/createstockcatagory',authenticateAdminToken,admin.createStockCatagory);
app.post('/createstockgroup',authenticateAdminToken,admin.createStockGroup);
app.post('/createbrand',authenticateAdminToken,admin.createBrand);

app.get('/getuser',authenticateAdminToken,admin.getUsers);
app.get('/getcustomers',authenticateToken,salesMan.getCustomers);
app.get('/getproducts',authenticateToken,salesMan.getProducts);
app.get('/getgsts',authenticateToken,salesMan.getGsts);
app.get('/getbrands',authenticateToken,salesMan.getBrands);
app.get('/getstockcatagorys',authenticateToken,salesMan.getStockCatagorys);
app.get('/getstockgroups',authenticateToken,salesMan.getStockGroups);

app.all('*', (req, res) => {
	res.sendStatus(404);
});
module.exports = app;
