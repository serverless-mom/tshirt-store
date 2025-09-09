const fs = require('fs');
const path = require('path');
const products = require('../data/products');

// Function to escape CSV fields
function escapeCSV(field) {
  if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
    return '"' + field.replace(/"/g, '""') + '"';
  }
  return field;
}

// Generate CSV content
function generateCSV() {
  const headers = [
    'ID',
    'Name',
    'SKU',
    'Price',
    'Color',
    'Category',
    'Material',
    'Weight',
    'Description',
    'Sizes',
    'Stock_S',
    'Stock_M', 
    'Stock_L',
    'Stock_XL',
    'Stock_XXL',
    'Total_Stock',
    'Image_Path'
  ];

  let csvContent = headers.join(',') + '\n';

  products.forEach(product => {
    const row = [
      escapeCSV(product.id),
      escapeCSV(product.name),
      escapeCSV(product.sku),
      product.price,
      escapeCSV(product.color),
      escapeCSV(product.category),
      escapeCSV(product.material),
      escapeCSV(product.weight),
      escapeCSV(product.description),
      escapeCSV(product.sizes.join(';')), // Use semicolon to separate sizes
      product.stock.S || 0,
      product.stock.M || 0,
      product.stock.L || 0,
      product.stock.XL || 0,
      product.stock.XXL || 0,
      product.totalStock,
      escapeCSV(product.image)
    ];
    
    csvContent += row.join(',') + '\n';
  });

  return csvContent;
}

// Generate the CSV
const csvData = generateCSV();

// Write to file
const outputPath = path.join(__dirname, '..', 'data', 'tshirts_inventory.csv');
fs.writeFileSync(outputPath, csvData, 'utf8');

console.log(`CSV file generated successfully: ${outputPath}`);
console.log(`Total products: ${products.length}`);
console.log(`Total inventory value: $${products.reduce((sum, p) => sum + (p.price * p.totalStock), 0).toFixed(2)}`);
console.log(`Total stock units: ${products.reduce((sum, p) => sum + p.totalStock, 0)}`);

// Also generate a summary CSV with just key info
const summaryHeaders = ['ID', 'Name', 'Total_Stock', 'Low_Stock_Alert'];
let summaryContent = summaryHeaders.join(',') + '\n';

products.forEach(product => {
  const row = [
    escapeCSV(product.id),
    escapeCSV(product.name),
    product.totalStock,
    product.totalStock < 50 ? 'YES' : 'NO'
  ];
  summaryContent += row.join(',') + '\n';
});

const summaryPath = path.join(__dirname, '..', 'data', 'tshirts_stock_summary.csv');
fs.writeFileSync(summaryPath, summaryContent, 'utf8');

console.log(`Stock summary CSV generated: ${summaryPath}`);