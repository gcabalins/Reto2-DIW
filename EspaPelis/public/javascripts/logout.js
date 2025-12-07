document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (res.redirected) {
        window.location.href = res.url;
      } else if (res.ok) {
        window.location.href = '/signin';
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (err) {
      console.error('Error en logout:', err);
    }
  });
});
