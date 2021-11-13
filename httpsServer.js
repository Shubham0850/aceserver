const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
const fs = require('fs');
const https = require('https');

const PORT = 443;
const options = {
	key: fs.readFileSync('client-key.pem'),
	cert: fs.readFileSync('client-cert.pem')
};

https.createServer(options,app).listen(PORT);