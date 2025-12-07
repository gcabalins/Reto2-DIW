var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const moviesPath = path.join(__dirname, '../public/data/collection.json');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio', username: req.session?.username });
});
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  next();
}
router.get('/list',requireLogin, (req, res) => {
  res.render('list', {
    title: 'Mi Colección',
    username: req.session?.username || null
  });
});
router.post('/api/movies', requireLogin, express.json(), (req, res) => {
  fs.readFile(moviesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo archivo' });

    let movies = [];
    try {
      movies = JSON.parse(data);
    } catch (e) {
      movies = [];
    }

    const body = req.body;
    const nextId = movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1;

    const newMovie = {
      id: nextId,
      title: body.title,
      year: body.year,
      category: body.category,
      director: body.director,
      description: body.description,
      format: body.format,
      state: body.state,
      image: body.image,
      public: !!body.public,
      ownerId: req.session.user.id      
    };

    movies.push(newMovie);

    fs.writeFile(moviesPath, JSON.stringify(movies, null, 2), 'utf8', (err) => {
      if (err) return res.status(500).json({ error: 'Error guardando archivo' });

      res.status(201).json(newMovie);
    });
  });
});
router.get('/api/my-movies', requireLogin, (req, res) => {
  fs.readFile(moviesPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo archivo' });

    let movies = [];
    try {
      movies = JSON.parse(data);
    } catch (e) {
      movies = [];
    }

    const userId = req.session.user.id;
    const myMovies = movies.filter(m => m.ownerId === userId);

    res.json(myMovies);
  });
});



module.exports = router;
