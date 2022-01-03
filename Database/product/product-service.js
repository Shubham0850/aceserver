const products = require('./product-model');
require('../mongo').connect();

async function get({ skip, limit }) {
  try {
    const Products = await products.find({}).skip(skip).limit(limit);
    return Products;
  } catch (err) {
    //handle err
  }
}

async function getLowStock({ skip = 0, limit = 0 }) {
  try {
    // const Products = await products
    //   .find({
    //     sellQuantity: {
    //       $lt: 15,
    //     },
    //   })
    //   .skip(skip)
    //   .limit(limit);

    const items = await products.aggregate([
      {
        $project: {
          name: '$name',
          openingQuantity: 1,
          inwardQuantity: 1,
          sellQuantity: 1,
          transferQuantity: 1,
          minimumQuantity: { $ifNull: ['$minimumQuantity', 15] },
          price: 1,

          temp: {
            $add: ['$openingQuantity', '$inwardQuantity'],
          },
          temp1: {
            $subtract: ['$sellQuantity', '$transferQuantity'],
          },
        },
      },
      {
        $project: {
          name: 1,
          minimumQuantity: 1,
          price: 1,

          stockQuantity: {
            $subtract: ['$temp', '$temp1'],
          },
        },
      },
    ]);

    return items;
  } catch (err) {
    console.log(err);
    //handle err
  }
}
getLowStock(0, 0);

async function create({
  name = '',
  description = '',
  modelNo = '',
  price = 0,
  stockGroup,
  stockCatagory,
  hsn = '',
  gst,
  barCodeNo = '',
  tallyName = '',
  brand,
  UOM = '',
  packSize = 0,
  weight = 0,
  CBM = 0,
  minimumQuantity = 15,
}) {
  try {
    const product = new products({
      name,
      description,
      modelNo,
      price,
      stockGroup,
      stockCatagory,
      hsn,
      gst,
      barCodeNo,
      tallyName,
      brand,
      UOM,
      packSize,
      weight,
      CBM,
      minimumQuantity,
    });
    await product.save();
    return true;
  } catch (err) {
    return false;
  }
}

async function incrimentInward({ _id, count = 0 }) {
  try {
    await products.findByIdAndUpdate(
      { _id },
      {
        $inc: {
          inwardQuantity: count,
        },
      },
    );
    return true;
  } catch (err) {
    //handle err
    console.log(err);
    return false;
  }
}

async function incrimentSell({ _id, count = 0 }) {
  try {
    await products.findByIdAndUpdate(
      { _id },
      {
        $inc: {
          sellQuantity: count,
        },
      },
    );
    return true;
  } catch (err) {
    //handle err
    console.log(err);
    return false;
  }
}
async function incrimentTransfer({ _id, count = 0 }) {
  try {
    await products.findByIdAndUpdate(
      { _id },
      {
        $inc: {
          transferQuantity: count,
        },
      },
    );
    return true;
  } catch (err) {
    //handle err
    console.log(err);
    return false;
  }
}

//exporting both of the function to use in the server
module.exports = {
  create,
  get,
  incrimentInward,
  incrimentSell,
  incrimentTransfer,
  getLowStock,
};
