/* Youssef */
function addColorRow() {
  const wrapper = document.getElementById('colorRows');
  const row = document.createElement('div');
  row.className = 'color-row-wrap';
  row.innerHTML = `
    <button type="button" class="remove-color-btn" onclick="removeColorRow(this)">−</button>
    <div class="color-row">
      <div>
        <div class="field">
          <label>Color Name</label>
          <input class="colorName" placeholder="Black" />
        </div>
        <div class="field">
          <label>Color Photo URL</label>
          <input class="colorPhoto" placeholder="https://image-link.com/photo.jpg" />
        </div>
      </div>
      <div class="field">
        <label>Color</label>
        <input class="colorHex" type="color" value="#111111" />
      </div>
    </div>
  `;
  wrapper.append(row);
}

function removeColorRow(button) {
  const rows = document.querySelectorAll('.color-row-wrap');
  if (rows.length <= 1) {
    toast('At least one color is required');
    return;
  }
  button.parentElement.remove();
}

function addProduct() {
  const name = document.getElementById('adminName').value.trim();
  const category = document.getElementById('adminCategory').value.trim();
  const gender = document.getElementById('adminGender').value;
  const price = Number(document.getElementById('adminPrice').value);
  const sizes = [
    { name: 'S',   qty: Number(document.getElementById('qtyS').value)   || 0 },
    { name: 'M',   qty: Number(document.getElementById('qtyM').value)   || 0 },
    { name: 'L',   qty: Number(document.getElementById('qtyL').value)   || 0 },
    { name: 'XL',  qty: Number(document.getElementById('qtyXL').value)  || 0 },
    { name: 'XXL', qty: Number(document.getElementById('qtyXXL').value) || 0 }
  ];
  const description = document.getElementById('adminDesc').value.trim();
  const rows = [...document.querySelectorAll('.color-row')];

  const colors = rows.map(row => ({
    name:  row.querySelector('.colorName').value.trim(),
    hex:   row.querySelector('.colorHex').value,
    photo: row.querySelector('.colorPhoto').value.trim()
  })).filter(c => c.name && c.photo);

  if (!name || !category || !price || !sizes.some(s => s.qty > 0) || !description || !colors.length) {
    toast('Fill all product fields');
    return;
  }

  products.push({ id: crypto.randomUUID(), name, category, gender, price, sizes, description, colors });
  saveProducts();
  clearAdminForm();
  renderCategories();
  renderProducts();
  renderAdmin();
  toast('Product added');
}

function clearAdminForm() {
  ['adminName', 'adminCategory', 'adminPrice', 'adminDesc'].forEach(id => document.getElementById(id).value = '');
  ['qtyS', 'qtyM', 'qtyL', 'qtyXL', 'qtyXXL'].forEach(id => document.getElementById(id).value = 0);
  document.getElementById('adminGender').value = 'men';
  document.getElementById('colorRows').innerHTML = '';
  addColorRow();
}

function renderAdmin() {
  const box = document.getElementById('adminProducts');
  box.innerHTML = products.map(product => `
    <div class="admin-product">
      <img src="${product.colors[0].photo}" />
      <div>
        <h3>${product.name}</h3>
        <p>${product.category} · ${formatGender(product.gender)} · $${product.price}</p>
        <p style="color:#666">${product.colors.length} colors · ${getSizeList(product).map(s => s.name + ': ' + s.qty).join(', ')}</p>
      </div>
      <button class="btn danger" onclick="deleteProduct('${product.id}')">Delete</button>
    </div>
  `).join('');
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  cart = cart.filter(item => item.productId !== id);
  saveProducts();
  saveCart();
  renderCategories();
  renderProducts();
  renderAdmin();
  updateCartCount();
  toast('Product deleted');
}

function resetDemoData() {
  products = defaultProducts;
  cart = [];
  saveProducts();
  saveCart();
  renderCategories();
  renderProducts();
  renderAdmin();
  updateCartCount();
  toast('Demo data reset');
}