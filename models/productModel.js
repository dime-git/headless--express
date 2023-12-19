const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  images: [
    {
      url: { type: String },
      priority: { type: Number, default: 1000 },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
