const express = require('express');
const productController = require('../controller/productController');
const upload = require('../middleware/multerConfig');

const productRouter = express.Router();

productRouter.post(
  '/product',
  upload.single('image'),
  productController.createProduct
);

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.put(
  '/:id',
  upload.single('image'),
  productController.updateProduct
);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
