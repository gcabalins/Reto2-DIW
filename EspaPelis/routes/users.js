const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).render('signup', { title: 'Crear cuenta', error: 'Todos los campos son obligatorios.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).render('signup', { title: 'Crear cuenta', error: 'Email inválido.' });
  }


  const dataPath = path.join(__dirname, '../public/data/user.json');

  let users = [];
  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath, 'utf8');
    users = raw ? JSON.parse(raw) : [];
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).render('signup', { title: 'Crear cuenta', error: 'Este email ya está registrado.' });
  }
  const lastId = users.length > 0 ? users[users.length - 1].id : 0;
  const newId = lastId + 1;

  const newUser = { id: newId, name, email, password };
  users.push(newUser);
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

  res.render('signin', { title: 'Inicio', mensaje: 'Cuenta creada con éxito' });
});


module.exports = router;
