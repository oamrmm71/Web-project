let currentProductId = localStorage.getItem('selectedProductId');
let selectedColorIndex = 0;
let selectedSize = '';

function loadProductDetails() {
  const product = products.find(p => p.id === currentProductId);

  if (!product) {
    document.getElementById('detailPage').innerHTML = `
      <div class="panel" style="margin:48px 6%">
        <h2>Product not found.</h2>
        <p style="margin-top:8px;color:#666">Please go back to the shop and choose a product.</p>
        <button class="btn" style="margin-top:18px" onclick="navigate('../home/home.html')">
          Back to Shop
        </button>
      </div>
    `;
    updateCartCount();
    return;
  }

  const availableSizes = getAvailableSizes(product);
  selectedSize = availableSizes[0]?.name || '';

  renderDetail();
  updateCartCount();
}

function renderDetail() {
  const product = products.find(p => p.id === currentProductId);

  if (!product) return;

  const color = product.colors[selectedColorIndex];

  document.getElementById('detailPage').innerHTML = `
    <div class="detail-layout">
      <img class="detail-image" src="${color.photo}" alt="${product.name}" />

      <aside class="detail-card">
        <button class="btn light" onclick="navigate('../home/home.html#shopSection')">
          Back to Shop
        </button>

        <p class="category" style="margin-top:24px">
          ${product.category} · ${formatGender(product.gender)}
        </p>

        <h1>${product.name}</h1>
        <p class="price">$${product.price}</p>
        <p class="desc">${product.description}</p>

        <p class="option-title">Color — ${color.name}</p>

        <div class="color-options">
          ${product.colors.map((c, index) => `
            <div class="color-option ${index === selectedColorIndex ? 'selected' : ''}" onclick="selectColor(${index})">
              <span class="dot" style="background:${c.hex}"></span>
              <span>${c.name}</span>
            </div>
          `).join('')}
        </div>

        <p class="option-title">Size</p>

        <div class="size-options">
          ${getSizeList(product).map(size => `
            <div class="size-option ${size.name === selectedSize ? 'selected' : ''} ${size.qty <= 0 ? 'out-stock' : ''}" onclick="selectSize('${size.name}')">
              ${size.name}
              <div class="stock-text">${size.qty} left</div>
            </div>
          `).join('')}
        </div>

        <button class="btn full" style="margin-top:28px" onclick="addToCart()">
          Add to Cart
        </button>
      </aside>
    </div>
  `;
}

function selectColor(index) {
  selectedColorIndex = index;
  renderDetail();
}

function selectSize(size) {
  const product = products.find(p => p.id === currentProductId);
  const stock = getStock(product, size);

  if (stock <= 0) {
    toast('This size is out of stock');
    return;
  }

  selectedSize = size;
  renderDetail();
}

function addToCart() {
  const product = products.find(p => p.id === currentProductId);

  if (!product) {
    toast('Product not found');
    return;
  }

  const color = product.colors[selectedColorIndex];

  const existing = cart.find(item =>
    item.productId === product.id &&
    item.colorName === color.name &&
    item.size === selectedSize
  );

  const alreadyInCart = existing ? existing.qty : 0;
  const stock = getStock(product, selectedSize);

  if (!selectedSize || stock <= 0) {
    toast('This size is out of stock');
    return;
  }

  if (alreadyInCart + 1 > stock) {
    toast('Only ' + stock + ' left in this size');
    return;
  }

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      colorName: color.name,
      colorHex: color.hex,
      photo: color.photo,
      size: selectedSize,
      qty: 1
    });
  }

  saveCart();
  updateCartCount();
  toast('Added to cart');
}

loadProductDetails();