const Formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/product_model');

/*---------------------------------------------------------*/

const createProduct = (req, res) => {
  const form = new Formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      console.log({ error });
      return res.status(400).json({
        error: 'Cannot process file',
      });
    }
    console.log('fields :', fields);
    console.log('files :', files);
    const { name, description, price, category, stock } = fields;
    const { image } = files;

    if (!name || !description || !price || !category || !stock || !image) {
      console.log('Incomplete/Incorrect fields');
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    const product = new Product(fields);
    console.log('new product object created');

    if (files.image) {
      if (files.image.size > 3000000) {
        console.log('File too big');

        return res.status(400).json({
          error: 'File too big',
        });
      }

      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
      console.log('files properties saved :', product.image);
    }

    product.save((err, product) => {
      if (err) {
        console.log('could not save product in db', err);
        return res.status(400).json({
          error: 'could not save product in db',
        });
      }
      res.status(200).json(product);
      console.log(' product saved');
    });
  });

  return;
};

/*---------------------------------------------------------*/

const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById({ _id: productId });
    // console.log(product);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ error: 'No product found' });
  }
};

/*---------------------------------------------------------*/

const getProductAll = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    const products = await Product.find()
      .select('-photo')
      .populate('category')
      .sort([[sortBy, 'asc']])
      .limit(limit);

    if (!products) {
      throw error;
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({
      error: 'No products found',
    });
  }
};

/*---------------------------------------------------------*/

const getUniqueCategoriesAll = (req, res) => {
  Product.distinct('category', {}, (error, categories) => {
    if (error) {
      console.log({ error });
      return res.status(404).json({
        error: 'No categories found',
      });
    }

    res.status(200).json(categories);
  });
};

/*---------------------------------------------------------*/

const updateProduct = (req, res) => {
  const form = new Formidable.IncomingForm();

  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      console.log({ error });
      return res.status(400).json({
        error: 'Cannot process file',
      });
    }
    console.log('fields :', fields);
    console.log('files :', files);

    let product = req.product;
    product = _.extend(product, fields);
    console.log('product updated');

    if (files.image) {
      if (files.image.size > 3000000) {
        console.log('File too big');

        return res.status(400).json({
          error: 'File too big',
        });
      }

      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
      console.log('files properties saved :', product.image);
    }

    product.save((err, product) => {
      if (err) {
        console.log('could not update product', err);
        return res.status(400).json({
          error: 'could not update product',
        });
      }
      res.status(200).json(product);
      console.log(' product saved in db');
    });
  });

  return;
};

/*---------------------------------------------------------*/

const deleteProduct = async (req, res) => {
  try {
    const product = await req.product;
    await product.remove();
    res.status(200).json({
      message: 'Product deleted succesfully',
    });
  } catch (error) {
    res.status(400).json({
      error: `Failed to delete ${product}`,
    });
  }
};

/*---------------------------------------------------------*/
const updateInventory = (req, res, next) => {
  let ops = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { stock: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(ops, {}, (error, result) => {
    if (error) {
      res.status(400).json({
        error: `Bulk operation failed`,
      });
    }
    next();
  });
};

/*---------------------------------------------------------*/

module.exports = {
  createProduct,
  getProduct,
  getProductAll,
  getUniqueCategoriesAll,
  updateProduct,
  deleteProduct,
  updateInventory,
};
