function showPage(page) {
  const ids = ['homePage', 'loginPage', 'signupPage', 'detailPage', 'cartPage', 'adminPage'];
  ids.forEach(id => document.getElementById(id).classList.add('hidden'));

  const target = document.getElementById(page + 'Page');
  target.classList.remove('hidden');
  target.classList.remove('fade-page');
  void target.offsetWidth;
  target.classList.add('fade-page');

  if (page === 'cart') renderCart();
  if (page === 'admin') renderAdmin();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1800);
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cartCount').textContent = total;
}