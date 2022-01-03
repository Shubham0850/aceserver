const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${file.originalname}-${Date.now()}.${ext}`);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
