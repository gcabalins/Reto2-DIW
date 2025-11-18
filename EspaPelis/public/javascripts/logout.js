document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  const usernameSpan = document.getElementById('username');

  if (logoutBtn && usernameSpan) {
    logoutBtn.addEventListener('click', () => {
      console.log('Cerrando sesión...');
      usernameSpan.textContent = '';
      logoutBtn.style.display = 'none';

      const sessionDiv = logoutBtn.parentElement;
      const loginLink = document.createElement('a');
      loginLink.href = '/signin';
      loginLink.textContent = 'Iniciar sesión';
      sessionDiv.appendChild(loginLink);
    });
  }
});
