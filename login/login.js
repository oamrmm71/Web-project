function fakeLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email) {
    toast('Please enter your email');
    return;
  }

  if (!password) {
    toast('Please enter your password');
    return;
  }

  localStorage.setItem(
    'styleeUser',
    JSON.stringify({
      email,
      name: email.split('@')[0]
    })
  );

  setLoginLabel();
  toast('Logged in successfully!');

  setTimeout(() => {
    navigate('../home/home.html');
  }, 900);
}

function setLoginLabel() {
  const btn = document.getElementById('loginNav');
  if (!btn) return;

  const user = JSON.parse(localStorage.getItem('styleeUser'));

  if (user) {
    btn.textContent = user.name || 'Account';
  } else {
    btn.textContent = 'Login';
  }
}

updateCartCount();
setLoginLabel();