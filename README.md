# T-Shirt Store - Ecommerce API

A complete ecommerce platform for selling t-shirts with inventory management, shopping cart functionality, and REST API.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - **Web Store**: http://localhost:3000
   - **API Base URL**: http://localhost:3000/api

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable.

## 🛍️ Store Features

- **Product Catalog**: 12 unique t-shirt designs
- **Shopping Cart**: Session-based cart management
- **Checkout Process**: Complete order flow with customer information
- **Responsive Design**: Mobile and desktop optimized
- **Stock Management**: Real-time inventory tracking

## 📊 Inventory Data

The store includes **12 t-shirt products** with:
- **Total Inventory**: 1,375 units
- **Total Value**: $38,476.25
- **Unique Product IDs**: TSH-001 through TSH-012
- **Size Options**: S, M, L, XL, XXL (varies by product)

## 🔌 REST API Documentation

### Base URL
```
http://localhost:3000/api
```

### Products API

#### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 12
}
```

#### Get Product by ID
```http
GET /api/products/:id
```

**Example:**
```bash
curl http://localhost:3000/api/products/TSH-001
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "TSH-001",
    "name": "Classic Black Tee",
    "price": 24.99,
    "description": "Essential black cotton t-shirt with a comfortable fit",
    "color": "Black",
    "category": "basics",
    "material": "100% Cotton",
    "weight": "180gsm",
    "sizes": ["S", "M", "L", "XL"],
    "stock": {
      "S": 25,
      "M": 30,
      "L": 35,
      "XL": 20
    },
    "totalStock": 110,
    "sku": "TSH-001-BLACK"
  }
}
```

### Stock Management API

#### Get Stock for Specific Product
```http
GET /api/products/:id/stock
```

**Example:**
```bash
curl http://localhost:3000/api/products/TSH-001/stock
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "TSH-001",
    "name": "Classic Black Tee",
    "sku": "TSH-001-BLACK",
    "stock": {
      "S": 25,
      "M": 30,
      "L": 35,
      "XL": 20
    },
    "totalStock": 110
  }
}
```

#### Get All Stock Summary
```http
GET /api/stock
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "TSH-001",
      "name": "Classic Black Tee",
      "sku": "TSH-001-BLACK",
      "stock": {...},
      "totalStock": 110,
      "lowStock": false
    }
  ],
  "lowStockItems": 0
}
```

#### Update Stock Levels
```http
PUT /api/products/:id/stock
```

**Request Body:**
```json
{
  "size": "M",
  "quantity": 25
}
```

**Example:**
```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"size":"M","quantity":25}' \
  http://localhost:3000/api/products/TSH-001/stock
```

#### Reduce Stock (for purchases)
```http
POST /api/products/:id/stock/reduce
```

**Request Body:**
```json
{
  "size": "M",
  "quantity": 2
}
```

**Example:**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"size":"M","quantity":2}' \
  http://localhost:3000/api/products/TSH-001/stock/reduce
```

### Category API

#### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "basics",
      "count": 4
    },
    {
      "name": "graphic",
      "count": 5
    },
    {
      "name": "vintage",
      "count": 2
    }
  ]
}
```

#### Get Products by Category
```http
GET /api/products/category/:category
```

**Example:**
```bash
curl http://localhost:3000/api/products/category/basics
```

## 📁 Project Structure

```
storefront/
├── app.js                 # Main Express application
├── bin/
│   └── www               # Server startup script
├── data/
│   ├── products.js       # Product data with inventory
│   ├── tshirts_inventory.csv      # Full inventory export
│   └── tshirts_stock_summary.csv  # Stock summary export
├── routes/
│   ├── index.js          # Main routes (web pages)
│   ├── cart.js           # Shopping cart routes
│   ├── checkout.js       # Checkout process routes
│   └── api.js            # REST API routes
├── views/                # Jade templates
├── public/               # Static assets (CSS, JS, images)
├── scripts/
│   └── generateCSV.js    # CSV generation utility
└── package.json
```

## 🛒 Shopping Cart & Checkout

### Cart Management
- **View Cart**: `/cart`
- **Add to Cart**: `POST /cart/add`
- **Update Cart**: `POST /cart/update`
- **Remove from Cart**: `POST /cart/remove`

### Checkout Process
- **Checkout Page**: `/checkout`
- **Process Order**: `POST /checkout/process`

## 📈 Data Management

### CSV Files

The system generates two CSV files for inventory management:

1. **`tshirts_inventory.csv`** - Complete product information including:
   - Product ID, Name, SKU, Price
   - Stock levels by size
   - Material, weight, color information
   - Category and description

2. **`tshirts_stock_summary.csv`** - Quick stock overview with:
   - Product ID and name
   - Total stock count
   - Low stock alerts

### Generate New CSV Files
```bash
node scripts/generateCSV.js
```

## 🔧 API Error Handling

All API endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (product/resource doesn't exist)
- `500` - Internal Server Error

## 📝 Development Notes

- **Session Management**: Uses express-session for cart persistence
- **Template Engine**: Jade/Pug for server-side rendering
- **Static Assets**: Served from `/public` directory
- **Database**: File-based product data (easily replaceable with database)

## 🚦 Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## 📞 API Testing Examples

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Get product details
```bash
curl http://localhost:3000/api/products/TSH-001
```

### Check stock levels
```bash
curl http://localhost:3000/api/products/TSH-001/stock
```

### Update inventory
```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"size":"L","quantity":50}' \
  http://localhost:3000/api/products/TSH-001/stock
```

---

## 🏪 Product Catalog

| ID | Name | Price | Category | Stock |
|----|------|-------|----------|-------|
| TSH-001 | Classic Black Tee | $24.99 | basics | 110 |
| TSH-002 | Vintage White Crew | $22.99 | basics | 135 |
| TSH-003 | Navy Blue V-Neck | $26.99 | basics | 90 |
| TSH-004 | Sunset Graphic Tee | $29.99 | graphic | 100 |
| TSH-005 | Mountain Adventure Tee | $31.99 | graphic | 130 |
| TSH-006 | Retro Striped Tee | $27.99 | vintage | 77 |
| TSH-007 | Ocean Wave Tee | $28.99 | graphic | 130 |
| TSH-008 | Heather Gray Pocket Tee | $25.99 | basics | 170 |
| TSH-009 | Urban Skyline Tee | $32.99 | graphic | 88 |
| TSH-010 | Tie-Dye Festival Tee | $34.99 | vintage | 65 |
| TSH-011 | Minimalist Logo Tee | $23.99 | basics | 200 |
| TSH-012 | Space Galaxy Tee | $33.99 | graphic | 80 |

**Total Inventory Value: $38,476.25**