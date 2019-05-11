const model = require('mongoose').model;
const Category = model('Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.body.id, req.body);
    await category.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
