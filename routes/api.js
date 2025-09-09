var express = require('express');
var router = express.Router();
var products = require('../data/products');

// GET /api/products - Get all t-shirts
router.get('/products', function(req, res) {
  res.json({
    success: true,
    data: products,
    total: products.length
  });
});

// GET /api/products/:id - Get specific t-shirt by ID
router.get('/products/:id', function(req, res) {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// GET /api/products/:id/stock - Get stock information for a specific t-shirt
router.get('/products/:id/stock', function(req, res) {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: {
      id: product.id,
      name: product.name,
      sku: product.sku,
      stock: product.stock,
      totalStock: product.totalStock
    }
  });
});

// GET /api/stock - Get stock information for all products
router.get('/stock', function(req, res) {
  const stockData = products.map(product => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    stock: product.stock,
    totalStock: product.totalStock,
    lowStock: product.totalStock < 50 // Flag for low stock items
  }));
  
  res.json({
    success: true,
    data: stockData,
    lowStockItems: stockData.filter(item => item.lowStock).length
  });
});

// PUT /api/products/:id/stock - Update stock for a specific product
router.put('/products/:id/stock', function(req, res) {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  const { size, quantity } = req.body;
  
  if (!size || quantity === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Size and quantity are required'
    });
  }
  
  if (!product.stock[size]) {
    return res.status(400).json({
      success: false,
      error: 'Invalid size for this product'
    });
  }
  
  if (quantity < 0) {
    return res.status(400).json({
      success: false,
      error: 'Quantity cannot be negative'
    });
  }
  
  // Update stock
  const oldQuantity = product.stock[size];
  product.stock[size] = quantity;
  
  // Recalculate total stock
  product.totalStock = Object.values(product.stock).reduce((sum, qty) => sum + qty, 0);
  
  res.json({
    success: true,
    message: `Stock updated for ${product.name} size ${size}`,
    data: {
      id: product.id,
      size: size,
      oldQuantity: oldQuantity,
      newQuantity: quantity,
      totalStock: product.totalStock
    }
  });
});

// POST /api/products/:id/stock/reduce - Reduce stock (for purchases)
router.post('/products/:id/stock/reduce', function(req, res) {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }
  
  const { size, quantity } = req.body;
  
  if (!size || !quantity || quantity <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Size and positive quantity are required'
    });
  }
  
  if (!product.stock[size]) {
    return res.status(400).json({
      success: false,
      error: 'Invalid size for this product'
    });
  }
  
  if (product.stock[size] < quantity) {
    return res.status(400).json({
      success: false,
      error: 'Insufficient stock',
      available: product.stock[size],
      requested: quantity
    });
  }
  
  // Reduce stock
  product.stock[size] -= quantity;
  product.totalStock -= quantity;
  
  res.json({
    success: true,
    message: `Stock reduced for ${product.name} size ${size}`,
    data: {
      id: product.id,
      size: size,
      quantityReduced: quantity,
      remainingStock: product.stock[size],
      totalStock: product.totalStock
    }
  });
});

// GET /api/categories - Get all product categories
router.get('/categories', function(req, res) {
  const categories = [...new Set(products.map(p => p.category))];
  const categoryData = categories.map(category => ({
    name: category,
    count: products.filter(p => p.category === category).length
  }));
  
  res.json({
    success: true,
    data: categoryData
  });
});

// GET /api/products/category/:category - Get products by category
router.get('/products/category/:category', function(req, res) {
  const category = req.params.category;
  const categoryProducts = products.filter(p => p.category === category);
  
  if (categoryProducts.length === 0) {
    return res.status(404).json({
      success: false,
      error: 'No products found in this category'
    });
  }
  
  res.json({
    success: true,
    data: categoryProducts,
    total: categoryProducts.length
  });
});

module.exports = router;