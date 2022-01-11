const excelToJson = require('convert-excel-to-json');
const productModel = require('../../Database/product/product-model');
const customerModel = require('../../Database/customer/customer-model');
const supplierModel = require('../../Database/supplier/supplier');
const transporterModel = require('../../Database/transporter/tranporter-schema');

async function uploadExcel(req, res) {
  var out = [];

  try {
    console.log(req.files);
    const result = excelToJson({
      sourceFile: req.files[0].path,
      header: {
        rows: 1,
      },
      columnToKey: {
        '*': '{{columnHeader}}',
      },
    });

    for (var i in result) {
      if (i == 'customers') {
        let data = result[i];
        for (var j in data) {
          data[j]['blocking'] = data[j]['blocking'].toLowerCase() === 'true';
          // data[j]['code'] = parseInt(data[j]['code']);
          // data[j]['contactMobile'] = parseInt(data[j]['contactMobile']);
          // data[j]['creditDays'] = parseInt(data[j]['creditDays']);
          // data[j]['creditLimit'] = parseInt(data[j]['creditLimit']);
        }

        try {
          const customers = await customerModel.insertMany(data);
        } catch (e) {
          out.push(e);
        }
      }
      if (i == 'products') {
        try {
          const products = await productModel.insertMany(result[i]);
        } catch (e) {
          out.push(e);
        }
      }
      if (i == 'suppliers') {
        let data = result[i];
        for (var j in data) {
          data[j]['blocking'] = data[j]['blocking'].toLowerCase() === 'true';
          // data[j]['code'] = parseInt(data[j]['code']);
          // data[j]['contactMobile'] = parseInt(data[j]['contactMobile']);
          // data[j]['creditDays'] = parseInt(data[j]['creditDays']);
          // data[j]['creditLimit'] = parseInt(data[j]['creditLimit']);
        }

        try {
          const suppliers = await supplierModel.insertMany(data);
        } catch (e) {
          out.push(e);
        }
      }

      if (i == 'transporters') {
        try {
          const transporters = await transporterModel.insertMany(result[i]);
        } catch (e) {
          out.push(e);
        }
      }
    }
    res.status(200).send(out);
  } catch (e) {
    out.push(e);
    res.status(500).send(out);
  }
}

module.exports = uploadExcel;
