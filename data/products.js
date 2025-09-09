const products = [
  {
    id: "TSH-001",
    name: "Classic Black Tee",
    price: 24.99,
    description: "Essential black cotton t-shirt with a comfortable fit",
    image: "/images/black-tee.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Black",
    category: "basics",
    stock: {
      "S": 25,
      "M": 30,
      "L": 35,
      "XL": 20
    },
    totalStock: 110,
    sku: "TSH-001-BLACK",
    material: "100% Cotton",
    weight: "180gsm"
  },
  {
    id: "TSH-002",
    name: "Vintage White Crew",
    price: 22.99,
    description: "Soft vintage-style white t-shirt with a relaxed fit",
    image: "/images/white-crew.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "White",
    category: "basics",
    stock: {
      "S": 15,
      "M": 40,
      "L": 45,
      "XL": 25,
      "XXL": 10
    },
    totalStock: 135,
    sku: "TSH-002-WHITE",
    material: "100% Cotton",
    weight: "160gsm"
  },
  {
    id: "TSH-003",
    name: "Navy Blue V-Neck",
    price: 26.99,
    description: "Premium navy blue v-neck t-shirt in 100% cotton",
    image: "/images/navy-vneck.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Navy Blue",
    category: "basics",
    stock: {
      "S": 20,
      "M": 25,
      "L": 30,
      "XL": 15
    },
    totalStock: 90,
    sku: "TSH-003-NAVY",
    material: "100% Cotton",
    weight: "200gsm"
  },
  {
    id: "TSH-004",
    name: "Sunset Graphic Tee",
    price: 29.99,
    description: "Trendy graphic t-shirt featuring a beautiful sunset design",
    image: "/images/sunset-graphic.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Orange",
    category: "graphic",
    stock: {
      "S": 18,
      "M": 32,
      "L": 28,
      "XL": 22
    },
    totalStock: 100,
    sku: "TSH-004-SUNSET",
    material: "60% Cotton, 40% Polyester",
    weight: "190gsm"
  },
  {
    id: "TSH-005",
    name: "Mountain Adventure Tee",
    price: 31.99,
    description: "Outdoor-inspired t-shirt with mountain landscape print",
    image: "/images/mountain-tee.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Forest Green",
    category: "graphic",
    stock: {
      "S": 12,
      "M": 35,
      "L": 40,
      "XL": 28,
      "XXL": 15
    },
    totalStock: 130,
    sku: "TSH-005-MOUNTAIN",
    material: "100% Cotton",
    weight: "210gsm"
  },
  {
    id: "TSH-006",
    name: "Retro Striped Tee",
    price: 27.99,
    description: "Classic striped t-shirt with retro color palette",
    image: "/images/striped-tee.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Multi-Color",
    category: "vintage",
    stock: {
      "S": 22,
      "M": 18,
      "L": 25,
      "XL": 12
    },
    totalStock: 77,
    sku: "TSH-006-STRIPED",
    material: "100% Cotton",
    weight: "170gsm"
  },
  {
    id: "TSH-007",
    name: "Ocean Wave Tee",
    price: 28.99,
    description: "Cool ocean wave design perfect for beach lovers",
    image: "/images/ocean-wave.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Light Blue",
    category: "graphic",
    stock: {
      "S": 30,
      "M": 42,
      "L": 38,
      "XL": 20
    },
    totalStock: 130,
    sku: "TSH-007-OCEAN",
    material: "50% Cotton, 50% Modal",
    weight: "185gsm"
  },
  {
    id: "TSH-008",
    name: "Heather Gray Pocket Tee",
    price: 25.99,
    description: "Comfortable heather gray t-shirt with chest pocket",
    image: "/images/gray-pocket.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Heather Gray",
    category: "basics",
    stock: {
      "S": 28,
      "M": 45,
      "L": 50,
      "XL": 35,
      "XXL": 12
    },
    totalStock: 170,
    sku: "TSH-008-HGRAY",
    material: "60% Cotton, 40% Polyester",
    weight: "195gsm"
  },
  {
    id: "TSH-009",
    name: "Urban Skyline Tee",
    price: 32.99,
    description: "Modern city skyline silhouette on premium fabric",
    image: "/images/urban-skyline.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Charcoal",
    category: "graphic",
    stock: {
      "S": 15,
      "M": 25,
      "L": 30,
      "XL": 18
    },
    totalStock: 88,
    sku: "TSH-009-URBAN",
    material: "100% Cotton",
    weight: "220gsm"
  },
  {
    id: "TSH-010",
    name: "Tie-Dye Festival Tee",
    price: 34.99,
    description: "Vibrant tie-dye t-shirt perfect for festivals and fun",
    image: "/images/tie-dye.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Multi-Color",
    category: "vintage",
    stock: {
      "S": 8,
      "M": 20,
      "L": 22,
      "XL": 15
    },
    totalStock: 65,
    sku: "TSH-010-TIEDYE",
    material: "100% Cotton",
    weight: "180gsm"
  },
  {
    id: "TSH-011",
    name: "Minimalist Logo Tee",
    price: 23.99,
    description: "Clean and simple logo design on soft cotton blend",
    image: "/images/minimalist-logo.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Stone Gray",
    category: "basics",
    stock: {
      "S": 35,
      "M": 50,
      "L": 55,
      "XL": 40,
      "XXL": 20
    },
    totalStock: 200,
    sku: "TSH-011-MINIMAL",
    material: "70% Cotton, 30% Polyester",
    weight: "175gsm"
  },
  {
    id: "TSH-012",
    name: "Space Galaxy Tee",
    price: 33.99,
    description: "Cosmic galaxy print that's out of this world",
    image: "/images/space-galaxy.jpg",
    sizes: ["S", "M", "L", "XL"],
    color: "Dark Purple",
    category: "graphic",
    stock: {
      "S": 10,
      "M": 25,
      "L": 28,
      "XL": 17
    },
    totalStock: 80,
    sku: "TSH-012-GALAXY",
    material: "100% Cotton",
    weight: "200gsm"
  }
];

module.exports = products;