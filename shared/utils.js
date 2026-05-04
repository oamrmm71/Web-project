function navigate(path) {
  window.location.href = path;
}

function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;

  el.textContent = message;
  el.classList.add('show');

  setTimeout(() => {
    el.classList.remove('show');
  }, 1800);
}

function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (!el) return;

  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  el.textContent = total;
}