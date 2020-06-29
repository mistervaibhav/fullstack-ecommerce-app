const Category = require('../models/category_model');

/*---------------------------------------------------------*/

const createCategory = async (req, res) => {
  try {
    console.log(req.body);
    const category = new Category(req.body);

    await category.save();
    console.log(`created category ${category}`);
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(400).json({
      error: 'Unable to save category in DB',
    });
  }
};

/*---------------------------------------------------------*/

const getCategory = (req, res) => {
  console.log('single cat funciton');

  return res.json(req.category);
};

/*---------------------------------------------------------*/

const getCategoryAll = (req, res) => {
  //console.log('all cats route called');

  Category.find().exec((err, categories) => {
    if (err) {
      console.log('No categories found');
      return res.status(400).json({
        error: 'No categories found',
      });
    }
    res.status(200).json(categories);
  });
};

/*---------------------------------------------------------*/

const updateCategory = async (req, res) => {
  try {
    const category = await req.category;

    category.name = req.body.name;

    await category.save();

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(400).json({
      error: 'Category update failed',
    });
  }
};
/*---------------------------------------------------------*/

const deleteCategory = async (req, res) => {
  try {
    const category = await req.category;

    await category.remove();

    return res.status(200).json({
      message: 'Category deleted succesfully',
    });
  } catch (error) {
    return res.status(400).json({
      error: `Failed to delete ${category}`,
    });
  }
};

/*---------------------------------------------------------*/

module.exports = {
  createCategory,
  getCategory,
  getCategoryAll,
  updateCategory,
  deleteCategory,
};
