const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const productRouter = require('./routes/productRouter');
const productController = require('./controller/productController');

const app = express();
const port = 4000;

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('DB connection error:', err));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/imageUpload', express.static(path.join(__dirname, 'imageUpload')));
app.get('/create-product', (req, res) => {
  res.send(productController.getHtmlForm());
});

app.use('/api/products', productRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
