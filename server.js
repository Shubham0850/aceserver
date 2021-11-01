const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app.js");

const DATABASE = process.env.DATABASE.replace(
  "<password>",
  process.env.PASSWORD
);
mongoose.connect(DATABASE).then(() => {
  console.log("Database Successfully Connected");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
