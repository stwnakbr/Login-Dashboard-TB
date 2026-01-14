const ALLOWED_EMAILS = [
  'edi.sukro@gmail.com',
  'ishlahuddin@gmail.com',
  'zahrul.bjalil@gmail.com',
  'destyanainggit@gmail.com',
  'salyonoys@gmail.com',
  'kikun.h@gmail.com',
  'stwnakbr710@gmail.com'
];

function handleCredentialResponse(response) {
  const payload = parseJwt(response.credential);
  const email = payload.email.toLowerCase();

  if (ALLOWED_EMAILS.includes(email)) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

    window.location.href = 'https://project-monitoring-dashboard.netlify.app/';
  } else {
    document.getElementById('error-msg').innerText =
      'Akses ditolak. Email tidak terdaftar.';
  }
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}
