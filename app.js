const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const authenticateToken = require('./Middlewares/authenticateToken');
const authenticateAdminToken = require('./Middlewares/authenticateAdminToken');
const getToken = require('./routeFunctions/getToken/getToken');
const inward = require('./routeFunctions/inward/inward');
const admin = require('./routeFunctions/Admin');
const salesMan = require('./routeFunctions/salesman');
const salesorder = require('./routeFunctions/salesorder/salesorder');
const supplier = require('./routeFunctions/supplier/supplier');
const Transporter = require('./routeFunctions/transporter');
const packandUnpack = require('./routeFunctions/packing-unpacking');
const StockFunctions = require('./routeFunctions/stock');
const printcode = require('./routeFunctions/printcode');
const expanse = require('./routeFunctions/expanse/expanse');
const Itemreport = require('./routeFunctions/itemReport/itemReport');
const partyReport = require('./routeFunctions/partyreport/partyreport');
const transactionReport = require('./routeFunctions/Transaction/index');

/////////////////////Routes///////////////////////////////////
app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});
app.post('/login', getToken);
//admin routes (only authenticated admin can fetch this)
app.post('/createuser', authenticateAdminToken, admin.createUser);
app.post('/updateuser', authenticateAdminToken, admin.updateUser);
app.post('/createcustomer', authenticateAdminToken, admin.createCustomer);
app.post('/createproduct', authenticateAdminToken, admin.createProduct);
app.post('/creategst', authenticateAdminToken, admin.createGst);
app.post(
  '/createstockcatagory',
  authenticateAdminToken,
  admin.createStockCatagory,
);
app.post('/createstockgroup', authenticateAdminToken, admin.createStockGroup);
app.post('/createbrand', authenticateAdminToken, admin.createBrand);
app.post('/createsalesorder', authenticateToken, salesorder.createSalesOrder);
app.post('/deleteuser', authenticateAdminToken, admin.deleteUser);
app.post('/updatecustomer', authenticateAdminToken, admin.updateCustomer);
app.post(
  '/createcustomergroup',
  authenticateAdminToken,
  admin.createCustomerGroup,
);
app.post('/createsalesorder', authenticateToken, salesorder.createSalesOrder);
app.post(
  '/updatesalesorder/:id',
  authenticateAdminToken,
  salesorder.updateSalesOrder,
);
app.post(
  '/deletesalesorder/:id',
  authenticateAdminToken,
  salesorder.deleteSalesOrder,
);
app.post('/createinward', authenticateToken, inward.createInward);
app.post('/updateinward/:id', authenticateAdminToken, inward.updateinward);
app.post('/deleteinward/:id', authenticateAdminToken, inward.deleteinward);
app.post('/createbarcode/:id', authenticateToken, StockFunctions.createBarcode);
app.post('/createsupplier', authenticateAdminToken, supplier.createSupplier);
app.post(
  '/updatesupplier/:id',
  authenticateAdminToken,
  supplier.updateSupplier,
);
app.post(
  '/deletesupplier/:id',
  authenticateAdminToken,
  supplier.deleteSupplier,
);
app.post(
  '/confirmsalesorder/:id',
  authenticateAdminToken,
  salesorder.confirmSalesOrder,
);
app.post('/packunpack', authenticateToken, packandUnpack);
app.post('/createtransporter', authenticateAdminToken, Transporter.create);
app.post(
  '/updatetransporter/:id',
  authenticateAdminToken,
  Transporter.updateTransporter,
);
app.post(
  '/deletetransporter/:id',
  authenticateAdminToken,
  Transporter.deleteTransporter,
);
app.post('/dispatch/:id', authenticateToken, salesorder.dispatch);
app.post('/printcode', authenticateToken, printcode);

app.get('/getsupplier', authenticateToken, supplier.getSupplier);
app.get('/getinward', authenticateToken, inward.getInward);
app.get('/getsalesorder', authenticateToken, salesorder.getSalesorder);
app.get('/getuser', authenticateAdminToken, admin.getUsers);
app.get('/getcustomers', authenticateToken, salesMan.getCustomers);
app.get('/getproducts', authenticateToken, salesMan.getProducts);
app.get('/getgsts', authenticateToken, salesMan.getGsts);
app.get('/getbrands', authenticateToken, salesMan.getBrands);
app.get('/getstockcatagorys', authenticateToken, salesMan.getStockCatagorys);
app.get('/getstockgroups', authenticateToken, salesMan.getStockGroups);
app.get('/gettransporter', authenticateToken, Transporter.get);
app.get('/getstocks', authenticateToken, StockFunctions.getStock);

//Expanse
app.get('/getexpanse', authenticateToken, expanse.getExpanse);
app.get('/getexpansecategory', authenticateToken, expanse.getexpanseCategory);
app.get('/getexpanseitem', authenticateToken, expanse.getExpanseItem);
app.post('/createexpanse', authenticateToken, expanse.createExpanse);
app.post('/createexpanseitem', authenticateToken, expanse.createExpanseItem);
app.post(
  '/createexpansecategory',
  authenticateToken,
  expanse.createExpanseCategory,
);
app.post('/updateexpanse', authenticateToken, expanse.updateExpanse);

//Item Report

app.get(
  '/getitemwisediscount',
  authenticateToken,
  Itemreport.getItemWiseDiscount,
);
app.get('/getallitems', authenticateToken, Itemreport.getAllItems);
app.get('/getitemprofitandloss', authenticateToken, Itemreport.getItemPandL);
app.post(
  '/getitemreportbyparty',
  authenticateToken,
  Itemreport.getItemReportByParty,
);
app.get('/getlowstockreport', authenticateToken, Itemreport.getLowStockReport);
// app.get('/getstocksummary', authenticateToken, Itemreport.getStockSummary);

//Party Report

app.get('/getallparties', authenticateToken, partyReport.getAllParties);
app.get('/getpartyprofitandloss', authenticateToken, partyReport.getPartyPandL);
app.post(
  '/getpartyreportbyitem',
  authenticateToken,
  partyReport.getPartyReportByItem,
);
app.post(
  '/getpartystatement',
  authenticateToken,
  partyReport.getPartyStatement,
);
app.get(
  '/getsalepurchasebyparty',
  authenticateToken,
  partyReport.getSalePurchaseByParty,
);
app.get(
  '/getsalepurchasebypartygroup',
  authenticateToken,
  partyReport.getSalePurchaseByPartyGroup,
);

//Transaction Report

app.get('/getsale', authenticateToken, transactionReport.sale);
app.get('/getpurchase', authenticateToken, transactionReport.purchase);
app.get(
  '/getalltransactions',
  authenticateToken,
  transactionReport.AllTransactions,
);
app.get('/getdaybook', authenticateToken, transactionReport.DayBook);
app.get('/getbillwise', authenticateToken, transactionReport.BillWise);
app.get('/getcashflow', authenticateToken, transactionReport.CashFlow);

app.all('*', (req, res) => {
  res.sendStatus(404);
});
module.exports = app;
