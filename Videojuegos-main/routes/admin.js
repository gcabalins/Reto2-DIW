var express = require('express');
var router = express.Router();
var dataService = require("../data/dataService");

router.post("/login",function(req,res,next){
  const username = req.body.username
  const password = req.body.password
  
  if( dataService.validateUser(username,password) ){
    req.session.isLogged = true;
    req.session.username = username;
    res.redirect("/admin")
  } else{
    res.render("login",{error:"No existe el usuario"})
  }
});

/*
router.get("/admin/edit/:pid",function(req,res,next){
  const item = ( dataService.findProductoById( req.params.pid))
  console.log(item)
  res.render('edit-item',{ item: item })
});
*/

router.get("/producto/:pid",function(req,res,next){
  if(req.session.isLogged){
    const id = req.params.pid
    const option = req.query.operation
    if(dataService.deleteProductoById(id)){
      res.redirect("/admin")
    }
    else res.redirect("/admin")
   
  } else res.redirect("/login")
});

/* router.post("/producto/:pid/delete",function(req,res,next){
  const id = req.params.pid
  dataService.deleteProductoById(id)
  res.redirect("/admin")  
}); */


router.post("/producto/delete",function(req,res,next){
  if(req.session.isLogged){
    const id = req.body.id
    dataService.deleteProductoById(id)
    res.redirect("/admin")   
  } else res.redirect("/login")
});


router.get("/",function(req,res){
  if(req.session.isLogged){
    res.render("admin",{ username : req.session.username, productos : dataService.findAllProductos()})
  } else res.redirect("/login")
});

router.get("/logout",function(req,res){
  req.session.destroy(()=>res.redirect("/"));
})



module.exports = router;
