var express = require('express');
var router = express.Router();
let regModel = require('../models/reg')

/* GET home page. */
router.get('/', function(req, res, next) {
 res.redirect('/home')
});

router.get('/home',(req,res)=>{
   res.render("users/index", {
    title: "Home",
    errorMessage: req.flash("errorMessage"),
    successMessage: req.flash("successMessage"),
    layout:'./layouts/indexLayout'
  });
})
router.post('/registeration', (req,res)=>{
  const Register = new regModel(req.body);
  Register.save()
  .then((data)=>{
     req.flash("successMessage","student registered successfully");
      res.redirect("/");
    res.redirect('/')
   console.log('new record')
  }).catch((err)=>{
    console.log(err)
  });

})

module.exports = router;
