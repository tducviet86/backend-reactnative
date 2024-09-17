const { products } = require('./data');
const nextId = require('./helpers/nextId');

exports.getProducts = (req, res) => {
  const {
    name,
  } = req.query;
  let filterProducts = products;

  if (name) {
    filterProducts = filterProducts.filter(
      item => item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        products: filterProducts
      }
    });
};

exports.addProduct = (req, res) => {
  const {
    name,
    price,
    image,
  } = req.body;

  const product = {
    id: nextId(products),
    name,
    price,
    image,
  }
  products.push(product);

  res
    .status(201)
    .json({
      status: 'success',
      data: {
        product
      }
    });
};

exports.getProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find(item => item.id === Number(id));

  if (product) {
    return res
      .status(200)
      .json({
        status: 'success',
        data: {
          product
        }
      });
  }

  res
    .status(404)
    .json({
      status: 'fail',
    });
}

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    image,
  } = req.body;

  const product = products.find(item => item.id === Number(id));
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;

    return res
      .status(200)
      .json({
        status: 'success',
        data: {
          product
        },
      });
  }

  res
    .status(404)
    .json({
      status: 'fail',
    });
}