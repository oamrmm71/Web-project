function renderProducts() {
  const grid = document.getElementById('productGrid');
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const gender = document.getElementById('genderFilter').value;

  const filtered = products.filter(product => {
    const matchSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchCategory =
      category === 'all' || product.category === category;

    const productGender = product.gender || 'both';

    const matchGender =
      gender === 'all' ||
      productGender === gender ||
      productGender === 'both';

    return matchSearch && matchCategory && matchGender;
  });

  grid.innerHTML = filtered.map(product => {
    const mainColor = product.colors[0];

    return `
      <article class="product-card">
        <img src="${mainColor.photo}" alt="${product.name}" onclick="openProduct('${product.id}')" />

        <div class="product-body">
          <p class="category">${product.category} · ${formatGender(product.gender)}</p>
          <h3>${product.name}</h3>
          <p class="price">$${product.price}</p>

          <div class="color-dots">
            ${product.colors.map(color => `
              <span class="dot" style="background:${color.hex}"></span>
            `).join('')}
          </div>

          <button class="btn full" onclick="openProduct('${product.id}')">
            View Product
          </button>
        </div>
      </article>
    `;
  }).join('') || '<p>No products found.</p>';
}

function renderCategories() {
  const select = document.getElementById('categoryFilter');
  const categories = [...new Set(products.map(product => product.category))];

  select.innerHTML =
    '<option value="all">All categories</option>' +
    categories.map(category => `
      <option value="${category}">${category}</option>
    `).join('');
}

function openProduct(id) {
  localStorage.setItem('selectedProductId', id);
  navigate('../product-details/product-details.html');
}

renderCategories();
renderProducts();
updateCartCount();