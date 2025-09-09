// Product page functionality with real-time stock updates
document.addEventListener('DOMContentLoaded', function() {
  // Initialize product page functionality
  initializeProductPage();
});

function initializeProductPage() {
  // Get product ID from the page
  const productDetail = document.querySelector('.product-detail');
  if (!productDetail) return;
  
  const productId = productDetail.getAttribute('data-product-id');
  
  // Initialize size selection
  initializeSizeSelection();
  
  // Initialize quantity selection
  initializeQuantitySelection();
  
  // Initialize add to cart functionality
  initializeAddToCart(productId);
  
  // Initialize refresh stock button
  initializeRefreshStock(productId);
  
  // Initialize tabs
  initializeTabs();
  
  // Load initial stock data
  refreshStockDisplay(productId);
}

function initializeSizeSelection() {
  const sizeSelect = document.getElementById('size');
  const quantityInput = document.getElementById('quantity');
  const quantityNote = document.getElementById('quantity-note');
  const addToCartBtn = document.querySelector('.add-to-cart-detail');
  
  if (!sizeSelect) return;
  
  sizeSelect.addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const stock = parseInt(selectedOption.getAttribute('data-stock')) || 0;
    
    if (this.value && stock > 0) {
      // Enable quantity input
      quantityInput.disabled = false;
      quantityInput.max = Math.min(stock, 10);
      quantityInput.value = 1;
      
      // Update quantity note
      quantityNote.textContent = `${stock} available in size ${this.value}`;
      quantityNote.className = 'quantity-note available';
      
      // Enable add to cart button
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = 'Add to Cart';
    } else {
      // Disable quantity input
      quantityInput.disabled = true;
      quantityInput.max = 1;
      quantityInput.value = 1;
      
      // Update quantity note
      if (this.value) {
        quantityNote.textContent = 'Size out of stock';
        quantityNote.className = 'quantity-note out-of-stock';
      } else {
        quantityNote.textContent = 'Please select a size first';
        quantityNote.className = 'quantity-note';
      }
      
      // Disable add to cart button
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = this.value ? 'Out of Stock' : 'Select Size';
    }
  });
}

function initializeQuantitySelection() {
  const quantityInput = document.getElementById('quantity');
  
  if (!quantityInput) return;
  
  quantityInput.addEventListener('change', function() {
    const max = parseInt(this.max);
    const value = parseInt(this.value);
    
    if (value > max) {
      this.value = max;
      showNotification(`Maximum quantity available: ${max}`, 'warning');
    }
    
    if (value < 1) {
      this.value = 1;
    }
  });
}

function initializeAddToCart(productId) {
  const addToCartBtn = document.querySelector('.add-to-cart-detail');
  
  if (!addToCartBtn) return;
  
  addToCartBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (this.disabled) return;
    
    const sizeSelect = document.getElementById('size');
    const quantityInput = document.getElementById('quantity');
    
    const size = sizeSelect.value;
    const quantity = parseInt(quantityInput.value);
    
    if (!size) {
      showNotification('Please select a size', 'error');
      return;
    }
    
    // Add to cart via API
    addToCart(productId, size, quantity);
  });
}

function initializeRefreshStock(productId) {
  const refreshBtn = document.querySelector('.refresh-stock');
  
  if (!refreshBtn) return;
  
  refreshBtn.addEventListener('click', function(e) {
    e.preventDefault();
    refreshStockDisplay(productId);
  });
}

function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

function refreshStockDisplay(productId) {
  const refreshBtn = document.querySelector('.refresh-stock');
  
  if (refreshBtn) {
    refreshBtn.disabled = true;
    refreshBtn.textContent = '🔄 Refreshing...';
  }
  
  // Fetch current stock from API
  fetch(`/api/products/${productId}/stock`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        updateStockDisplay(data.data);
        showNotification('Stock information updated', 'success');
      } else {
        showNotification('Failed to refresh stock information', 'error');
      }
    })
    .catch(error => {
      console.error('Error refreshing stock:', error);
      showNotification('Error refreshing stock information', 'error');
    })
    .finally(() => {
      if (refreshBtn) {
        refreshBtn.disabled = false;
        refreshBtn.textContent = '🔄 Refresh Stock';
      }
    });
}

function updateStockDisplay(stockData) {
  // Update total stock
  const totalStockSpan = document.getElementById('total-stock');
  if (totalStockSpan) {
    totalStockSpan.textContent = stockData.totalStock;
  }
  
  // Update stock level class
  const stockLevelP = document.querySelector('.stock-level');
  if (stockLevelP) {
    const isLowStock = stockData.totalStock < 50;
    stockLevelP.className = isLowStock ? 'stock-level low-stock' : 'stock-level in-stock';
    
    // Update low stock warning
    const stockWarning = stockLevelP.querySelector('.stock-warning');
    if (isLowStock && !stockWarning) {
      const warningSpan = document.createElement('span');
      warningSpan.className = 'stock-warning';
      warningSpan.textContent = ' (Low Stock!)';
      stockLevelP.appendChild(warningSpan);
    } else if (!isLowStock && stockWarning) {
      stockWarning.remove();
    }
  }
  
  // Update size stock grid
  const sizeStockItems = document.querySelectorAll('.size-stock-item');
  sizeStockItems.forEach(item => {
    const sizeLabel = item.querySelector('.size-label').textContent;
    const stockCount = item.querySelector('.stock-count');
    const outOfStockLabel = item.querySelector('.out-of-stock-label');
    
    const sizeStock = stockData.stock[sizeLabel] || 0;
    stockCount.textContent = sizeStock;
    
    if (sizeStock > 0) {
      item.className = 'size-stock-item available';
      if (outOfStockLabel) {
        outOfStockLabel.remove();
      }
    } else {
      item.className = 'size-stock-item out-of-stock';
      if (!outOfStockLabel) {
        const label = document.createElement('span');
        label.className = 'out-of-stock-label';
        label.textContent = 'Out of Stock';
        item.appendChild(label);
      }
    }
  });
  
  // Update size selection dropdown
  const sizeSelect = document.getElementById('size');
  if (sizeSelect) {
    Array.from(sizeSelect.options).forEach(option => {
      if (option.value) {
        const sizeStock = stockData.stock[option.value] || 0;
        option.setAttribute('data-stock', sizeStock);
        
        if (sizeStock > 0) {
          option.disabled = false;
          option.textContent = `${option.value} (${sizeStock} available)`;
        } else {
          option.disabled = true;
          option.textContent = `${option.value} (Out of Stock)`;
        }
      }
    });
    
    // Trigger change event to update UI
    sizeSelect.dispatchEvent(new Event('change'));
  }
  
  // Update tab stock information
  updateTabStockInfo(stockData);
}

function updateTabStockInfo(stockData) {
  const stockTab = document.getElementById('stock');
  if (!stockTab) return;
  
  // Update total stock in tab
  const stockDetails = stockTab.querySelector('.stock-details p');
  if (stockDetails) {
    stockDetails.textContent = `Current total stock: ${stockData.totalStock} units`;
  }
  
  // Update size breakdown
  const sizeRows = stockTab.querySelectorAll('.size-row');
  sizeRows.forEach(row => {
    const sizeText = row.textContent.split(':')[0].trim();
    const sizeStock = stockData.stock[sizeText] || 0;
    
    row.innerHTML = `
      <span>${sizeText}: </span>
      <strong>${sizeStock} units</strong>
      ${sizeStock === 0 ? '<span class="out-of-stock"> (Out of Stock)</span>' : ''}
    `;
  });
}

function addToCart(productId, size, quantity) {
  fetch('/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId: productId,
      size: size,
      quantity: quantity
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Update cart count
      const cartCount = document.getElementById('cart-count');
      if (cartCount) {
        cartCount.textContent = data.cartCount;
      }
      
      showNotification(`Added ${quantity} item(s) to cart!`, 'success');
      
      // Refresh stock to show updated inventory
      const productDetail = document.querySelector('.product-detail');
      const currentProductId = productDetail.getAttribute('data-product-id');
      setTimeout(() => refreshStockDisplay(currentProductId), 1000);
    } else {
      showNotification('Error adding item to cart: ' + data.error, 'error');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showNotification('Error adding item to cart', 'error');
  });
}

function showNotification(message, type) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.remove();
  }, 4000);
}