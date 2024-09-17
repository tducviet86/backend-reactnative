const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();


const productController = require('./product.controller');
const authController = require('./auth.controller');
const userController = require('./user.controller');
const authenticateJWT = require('./middlewares/authenticateJWT');

const app = express();
app.use(express.static(`${__dirname}/public`));

const port = 3100;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('LetDiv');
});

app.post('/auth/signup', authController.signup);
app.post('/auth/login', authController.login);

app.use(authenticateJWT);

app
  .route('/users/me')
  .get(userController.getMe)
  .patch(
    userController.uploadAvatar,
    userController.updateMe
  );

app
  .route('/products')
  .get(productController.getProducts)
  .post(productController.addProduct);

app
  .route('/products/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct);

app.listen(port, () => {
  console.log(`LetDiv app listening on port ${port}`)
});