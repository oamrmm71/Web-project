function renderCart() {
  const box = document.getElementById('cartItems');

  if (!cart.length) {
    box.innerHTML = '<div class="panel"><h2>Your cart is empty.</h2><p style="margin-top:8px;color:#666">Add products from the shop.</p></div>';
  } else {
    box.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.photo}" alt="${item.name}" />
        <div>
          <p class="category">${item.category}</p>
          <h3>${item.name}</h3>
          <p>${item.colorName} · Size ${item.size}</p>
          <p class="price">$${item.price}</p>
          <div class="qty">
            <button onclick="changeQty(${index}, -1)">-</button>
            <strong>${item.qty}</strong>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <div>
          <strong>$${item.price * item.qty}</strong><br><br>
          <button class="btn danger" onclick="removeCartItem(${index})">Remove</button>
        </div>
      </div>
    `).join('');
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 12 : 0;
  document.getElementById('subtotalText').textContent = '$' + subtotal;
  document.getElementById('shippingText').textContent = '$' + shipping;
  document.getElementById('totalText').textContent = '$' + (subtotal + shipping);
  updateCartCount();
}

function changeQty(index, amount) {
  if (amount > 0) {
    const product = products.find(p => p.id === cart[index].productId);
    const stock = getStock(product, cart[index].size);

    if (cart[index].qty + 1 > stock) {
      toast('Only ' + stock + ' left in this size');
      return;
    }
  }

  cart[index].qty += amount;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function checkout() {
  if (!cart.length) {
    toast('Cart is empty');
    return;
  }
  cart = [];
  saveCart();
  renderCart();
  toast('Order placed successfully');
}