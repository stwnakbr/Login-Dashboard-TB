const APPS_SCRIPT_URL = 'PASTE_WEB_APP_URL_DISINI';

function handleCredentialResponse(response) {
  const jwt = response.credential;
  const payload = parseJwt(jwt);
  const email = payload.email;

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    if (data.allowed) {
      // redirect ke dashboard
      window.location.href = 'https://project-monitoring-dashboard.netlify.app/';
    } else {
      document.getElementById('error-msg').innerText =
        'Akses ditolak. Email tidak terdaftar.';
    }
  })
  .catch(() => {
    document.getElementById('error-msg').innerText =
      'Terjadi kesalahan koneksi.';
  });
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}
