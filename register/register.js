function fakeSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!name) {
    toast('Please enter your name');
    return;
  }

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
      name,
      email
    })
  );

  setLoginLabel();
  toast('Account created successfully!');

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