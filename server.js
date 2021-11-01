const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app.js');


const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}...`);
});
