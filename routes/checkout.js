var express = require('express');
var router = express.Router();
var products = require('../data/products');

/* GET checkout page */
router.get('/', function(req, res, next) {
  const cart = req.session.cart || [];
  
  if (cart.length === 0) {
    return res.redirect('/cart');
  }

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

  res.render('checkout', {
    title: 'Checkout',
    cartItems: cartItems,
    totalPrice: totalPrice.toFixed(2)
  });
});

/* POST process order */
router.post('/process', function(req, res, next) {
  const cart = req.session.cart || [];
  
  if (cart.length === 0) {
    return res.redirect('/cart');
  }

  // In a real app, you would:
  // 1. Validate payment information
  // 2. Process payment with payment gateway
  // 3. Create order in database
  // 4. Send confirmation email
  // 5. Update inventory

  // For this demo, we'll just simulate a successful order
  const orderNumber = 'ORD-' + Date.now();
  
  // Clear the cart
  req.session.cart = [];
  
  res.render('order-success', {
    title: 'Order Confirmation',
    orderNumber: orderNumber,
    customerEmail: req.body.email
  });
});

module.exports = router;