const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/details/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  const dataPath = path.join(__dirname, '../public/data/collection.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const movies = raw ? JSON.parse(raw) : [];

  const movie = movies.find(m => m.id === id);
  if (!movie) {
    return res.status(404).render('error', { message: 'Película no encontrada' });
  }
  function getStateClass(state = '') {
    const s = state.toLowerCase();
    if (s === 'nuevo') return 'state-new';
    if (s === 'bueno') return 'state-good';
    if (s === 'malo')  return 'state-bad';
    return 'state-unknown';
    }


  res.render('details', {
    title: movie.title,
    movie,
    stateClass: getStateClass(movie.state)
  });
});

module.exports = router;
