const TransporterModel = require('./tranporter-schema');
require('../mongo').connect();
async function get() {
  try {
    const transporter = await TransporterModel.find({});
    return transporter;
  } catch (err) {
    return false;
    //handle err
  }
}
async function create({ email, name, phoneNumber, description }) {
  const transporter = new TransporterModel({
    email,
    name,
    phoneNumber,
    description,
  });
  try {
    await transporter.save();
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  create,
  get,
};
