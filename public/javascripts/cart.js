// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-detail');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const productId = this.getAttribute('data-product-id');
      const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : 1;
      const size = document.getElementById('size') ? document.getElementById('size').value : 'M';
      
      // Send AJAX request to add item to cart
      fetch('/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: parseInt(quantity),
          size: size
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Update cart count
          document.getElementById('cart-count').textContent = data.cartCount;
          
          // Show success message
          showNotification('Item added to cart!', 'success');
        } else {
          showNotification('Error adding item to cart', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showNotification('Error adding item to cart', 'error');
      });
    });
  });
  
  // Load cart count on page load
  updateCartCount();
});

function updateCartCount() {
  // This would typically make an API call to get current cart count
  // For now, we'll just keep the count updated through the add to cart responses
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}