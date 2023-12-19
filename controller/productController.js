const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    let imageUrl;

    if (req.file) {
      imageUrl = `http://localhost:4000/imageUpload/${req.file.filename}`;
    }

    const update = {
      ...req.body,
    };

    if (imageUrl) {
      update.images = [{ url: imageUrl, priority: 1000 }];
    }

    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log('createProduct called');

    let imageUrl;

    if (req.file) {
      imageUrl = `http://localhost:4000/imageUpload/${req.file.filename}`;
    }
    console.log('Request File:', req.file);

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      images: imageUrl ? [{ url: imageUrl, priority: 1000 }] : [],
    });
    console.log('Request Body:', req.body);

    const savedProduct = await product.save();

    const productURL = `/api/products/${savedProduct._id}`;
    res.redirect(productURL);
  } catch (error) {
    console.error('Error in createProduct:', error);
    if (!res.headersSent) {
      return res
        .status(500)
        .send('Error occurred while creating product: ' + error.message);
    }
  }
};

const getHtmlForm = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Upload Form</title>
      </head>
      <body>
        <form action="http://localhost:4000/api/products/product" method="POST" enctype="multipart/form-data">
          <label for="name">Product Name:</label>
          <input type="text" id="name" name="name" required>

          <br>

          <label for="price">Product Price:</label>
          <input type="text" id="price" name="price" required>

          <br>

          <label for="image">Product Image:</label>
          <input type="file" id="image" name="image" accept="image/*">

          <br>

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getHtmlForm,
};
