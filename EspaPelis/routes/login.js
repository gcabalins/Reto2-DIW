const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Inicio',
    username: null  // No logueado
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validar campos vacíos
  if (!email || !password) {
    return res.status(400).render('signin', { 
      title: 'Iniciar sesión', 
      error: 'Por favor, completa todos los campos.' 
    });
  }

  // Validar formato de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).render('signin', { 
      title: 'Iniciar sesión', 
      error: 'El formato del email no es válido.' 
    });
  }

  const dataPath = path.join(__dirname, '../public/data/user.json');

  if (!fs.existsSync(dataPath)) {
    return res.status(404).render('signin', { 
      title: 'Iniciar sesión', 
      error: 'No hay usuarios registrados.' 
    });
  }

  const raw = fs.readFileSync(dataPath, 'utf8');
  const users = raw ? JSON.parse(raw) : [];

  // Buscar usuario por email
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).render('signin', { 
      title: 'Iniciar sesión', 
      error: 'Usuario no encontrado.' 
    });
  }

  // Verificar contraseña
  if (user.password !== password) {
    return res.status(401).render('signin', { 
      title: 'Iniciar sesión', 
      error: 'Contraseña incorrecta.' 
    });
  }

  // Si todo está bien, redirigir o renderizar página de inicio
  res.render('index', { 
    title: 'Inicio', 
    username: user.name, 
  });
});
module.exports = router;