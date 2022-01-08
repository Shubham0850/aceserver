const excelToJson = require('convert-excel-to-json');

async function uploadExcel(req, res) {
  console.log(req.files);
  const result = excelToJson({
    sourceFile: req.files[0].path,
    header: {
      rows: 0,
    },
    columnToKey: {
      '*': '{{columnHeader}}',
    },
  });
  for (var i in result) {
    if (i == '') {
      console.log(result[i]);
    }
  }
  res.send('hi');
}

module.exports = uploadExcel;
