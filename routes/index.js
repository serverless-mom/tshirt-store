var express = require('express');
var router = express.Router();
var products = require('../data/products');

/* GET home page - product catalog */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'T-Shirt Store', 
    products: products 
  });
});

/* GET individual product page */
router.get('/product/:id', function(req, res, next) {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).render('error', { 
      message: 'Product not found',
      error: { status: 404 }
    });
  }
  
  // Get current stock levels via internal API call
  const stockInfo = {
    stock: product.stock,
    totalStock: product.totalStock,
    lowStock: product.totalStock < 50
  };
  
  // Add stock availability for each size
  const sizesWithStock = product.sizes.map(size => ({
    size: size,
    available: product.stock[size] || 0,
    inStock: (product.stock[size] || 0) > 0
  }));
  
  res.render('product', { 
    title: product.name,
    product: product,
    stockInfo: stockInfo,
    sizesWithStock: sizesWithStock
  });
});

module.exports = router;
