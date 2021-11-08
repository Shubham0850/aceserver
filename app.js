const express = require('express');
const cors = require(('cors'));
const app = express();
app.use(express.json());
app.use(cors());
const authenticateToken = require('./Middlewares/authenticateToken');
const authenticateAdminToken = require('./Middlewares/authenticateAdminToken');
const getToken = require('./routeFunctions/getToken/getToken');
const inward  = require('./routeFunctions/inward/inward');
const admin = require('./routeFunctions/Admin');
const salesMan = require('./routeFunctions/salesman');
const salesorder = require('./routeFunctions/salesorder/salesorder');

/////////////////////Routes///////////////////////////////////
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
app.post('/createsalesorder',authenticateToken,salesorder.createSalesOrder);
app.post('/deleteuser',authenticateAdminToken,admin.deleteUser);
app.post('/updatecustomer',authenticateAdminToken,admin.updateCustomer);
app.post('/createsalesorder',authenticateToken,salesorder.createSalesOrder);
app.post('/updatesalesorder/:id',authenticateAdminToken,salesorder.updateSalesOrder);
app.post('/deletesalesorder/:id',authenticateAdminToken, salesorder.deleteSalesOrder);
app.post('/createInward',authenticateToken,inward.createInward);
app.post('/updateinward/:id',authenticateAdminToken,inward.updateinward);
app.post('/deleteinward/:id',authenticateAdminToken,inward.deleteinward);

app.get('/getinward',authenticateToken,inward.getInward);
app.get('/getsalesorder',authenticateToken, salesorder.getSalesorder);
app.get('/getuser',authenticateAdminToken,admin.getUsers);
app.get('/getcustomers',authenticateToken,salesMan.getCustomers);
app.get('/getproducts',authenticateToken,salesMan.getProducts);
app.get('/getgsts',authenticateToken,salesMan.getGsts);
app.get('/getbrands',authenticateToken,salesMan.getBrands);
app.get('/getstockcatagorys',authenticateToken,salesMan.getStockCatagorys);
app.get('/getstockgroups',authenticateToken,salesMan.getStockGroups);
app.get('/getsalesorders',authenticateToken,salesorder.getSalesorder);

app.all('*', (req, res) => {
	res.sendStatus(404);
});
module.exports = app;
