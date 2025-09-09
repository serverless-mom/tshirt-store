var express = require('express');
var router = express.Router();
var products = require('../data/products');

/* GET cart page */
router.get('/', function(req, res, next) {
  const cart = req.session.cart || [];
  let cartItems = [];
  let totalPrice = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      const cartItem = {
        product: product,
        quantity: item.quantity,
        size: item.size,
        subtotal: product.price * item.quantity
      };
      cartItems.push(cartItem);
      totalPrice += cartItem.subtotal;
    }
  });

  res.render('cart', {
    title: 'Shopping Cart',
    cartItems: cartItems,
    totalPrice: totalPrice.toFixed(2)
  });
});

/* POST add to cart */
router.post('/add', function(req, res, next) {
  if (!req.session.cart) {
    req.session.cart = [];
  }

  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity) || 1;
  const size = req.body.size || 'M';

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingItem = req.session.cart.find(item => 
    item.productId === productId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({
      productId: productId,
      quantity: quantity,
      size: size
    });
  }

  res.json({ 
    success: true, 
    message: 'Item added to cart',
    cartCount: req.session.cart.reduce((sum, item) => sum + item.quantity, 0)
  });
});

/* POST remove from cart */
router.post('/remove', function(req, res, next) {
  const productId = req.body.productId;
  const size = req.body.size;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => 
      !(item.productId === productId && item.size === size)
    );
  }

  res.redirect('/cart');
});

/* POST update cart quantity */
router.post('/update', function(req, res, next) {
  const productId = req.body.productId;
  const size = req.body.size;
  const quantity = parseInt(req.body.quantity);

  if (req.session.cart && quantity > 0) {
    const item = req.session.cart.find(item => 
      item.productId === productId && item.size === size
    );
    if (item) {
      item.quantity = quantity;
    }
  }

  res.redirect('/cart');
});

module.exports = router;