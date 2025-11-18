var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Inicio',
    username: null  
  });
});

router.get('/contact', (req, res) => {
  res.render('contact' ,{ title: 'Soporte' });
});



module.exports = router;
