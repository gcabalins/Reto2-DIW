var express = require('express');
var router = express.Router();
var dataService = require("../data/dataService");

/* GET home page. */
router.get('/', function(req, res, next) {
  const items = dataService.findAllProductosLessThan(50)
  console.log(req.query)
  if(req.query.error!==undefined) {
    console.log("error")
    res.render('index', { productos : items, error : "El usuario no existe", isLogged: req.session.isLogged });     
  } else{
    console.log("ok")
    res.render('index', { productos : items, isLogged: req.session.isLogged })
  }
});

router.get("/producto/:pid",function(req,res,next){
  const item = ( dataService.findProductoById( req.params.pid))
  console.log(item)
  res.render('item',{ item: item })
});

router.get("/login",function(req,res){
  res.render("login",{})
})

module.exports = router;