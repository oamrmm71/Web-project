const defaultProducts = [
  {
    id: 'puffer-jacket',
    name: 'Premium Puffer Jacket',
    category: 'Jackets',
    gender: 'men',
    price: 179,
    sizes: [
      { name: 'S', qty: 8 },
      { name: 'M', qty: 10 },
      { name: 'L', qty: 7 },
      { name: 'XL', qty: 5 },
      { name: 'XXL', qty: 3 }
    ],
    description: 'Oversized premium puffer with quilted paneling. Water-resistant shell and streetwear fit.',
    colors: [
      {
        name: 'Black',
        hex: '#000000',
        photo: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=900'
      },
      {
        name: 'Navy',
        hex: '#263949',
        photo: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900'
      },
      {
        name: 'Brown',
        hex: '#71430f',
        photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900'
      }
    ]
  },
  {
    id: 'bomber-camo-set',
    name: 'Bomber & Camo Set',
    category: 'Sets',
    gender: 'women',
    price: 189,
    sizes: [
      { name: 'S', qty: 6 },
      { name: 'M', qty: 8 },
      { name: 'L', qty: 5 },
      { name: 'XL', qty: 4 },
      { name: 'XXL', qty: 2 }
    ],
    description: 'Relaxed streetwear set with oversized bomber jacket and camo pants.',
    colors: [
      {
        name: 'Olive',
        hex: '#556b2f',
        photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900'
      },
      {
        name: 'Black',
        hex: '#111111',
        photo: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900'
      }
    ]
  },
  {
    id: 'urban-black-ensemble',
    name: 'Urban Black Ensemble',
    category: 'Outerwear',
    gender: 'both',
    price: 249,
    sizes: [
      { name: 'S', qty: 4 },
      { name: 'M', qty: 6 },
      { name: 'L', qty: 5 },
      { name: 'XL', qty: 3 },
      { name: 'XXL', qty: 1 }
    ],
    description: 'Layered urban outfit made for daily streetwear styling.',
    colors: [
      {
        name: 'Black',
        hex: '#000000',
        photo: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=900'
      },
      {
        name: 'Grey',
        hex: '#777777',
        photo: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900'
      }
    ]
  }
];

let products = JSON.parse(localStorage.getItem('styleeProducts')) || defaultProducts;
let cart = JSON.parse(localStorage.getItem('styleeCart')) || [];

function saveProducts() {
  localStorage.setItem('styleeProducts', JSON.stringify(products));
}

function saveCart() {
  localStorage.setItem('styleeCart', JSON.stringify(cart));
}

function getSizeList(product) {
  return (product.sizes || []).map(size => {
    if (typeof size === 'string') {
      return { name: size, qty: 99 };
    }

    return size;
  });
}

function getAvailableSizes(product) {
  return getSizeList(product).filter(size => size.qty > 0);
}

function getStock(product, sizeName) {
  if (!product) return 0;

  const size = getSizeList(product).find(item => item.name === sizeName);
  return size ? size.qty : 0;
}

function formatGender(value) {
  if (value === 'men') return 'Men';
  if (value === 'women') return 'Women';
  return 'Men & Women';
}