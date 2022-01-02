const expanse = require('../../Database/expanse/expanse/expanse-model');
const expanseService = require('../../Database/expanse/expanse/expanse-service');

const expanseCategory = require('../../Database/expanse/expanse-category/expanse-category');
const categoryService = require('../../Database/expanse/expanse-category/expanse-category-service');

const expanseItem = require('../../Database/expanse/expanse-item/expanse-item');
const itemService = require('../../Database/expanse/expanse-item/expanse-item-service');
//GET /inward?status=dispatch
//Get/inward?sortBy=cretedAt:desc  for recent orders

async function createExpanseCategory(req, res) {
  try {
    const expanse = await categoryService.create(req.body);

    return res.status(200).send(expanse);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function createExpanse(req, res) {
  try {
    const expanse = await expanseService.create(req.body);

    return res.status(200).send(expanse);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function createExpanseItem(req, res) {
  try {
    const expanse = await itemService.create(req.body);

    return res.status(200).send(expanse);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getExpanse(req, res) {
  try {
    const expanse = await expanseService.get(req.body);

    return res.status(200).send(expanse);
  } catch (e) {
    res.status(500).send(e);
  }
}
async function getExpanseItem(req, res) {
  try {
    const expanse = await itemService.get(req.body);

    return res.status(200).send(expanse);
  } catch (e) {
    res.status(500).send(e);
  }
}

async function getexpanseCategory(req, res) {
  try {
    const category = await expanseService.get(req.body);
    res.status(200).send(category);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  createExpanse,
  createExpanseItem,
  getexpanseCategory,
  createExpanseCategory,
  getExpanseItem,

  getExpanse,
};
