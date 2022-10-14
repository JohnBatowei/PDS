let express = require('express')
let router = express.Router() 
// const mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let adminModel = require("../models/admin");
let regModel = require('../models/reg')
let studentReceipt = require('../models/receipt')
let userModel= require('../models/users')

const isAuth = require('../authentication/adminAuth')
const userAuth = require('../authentication/usersAuth')

router.post('/', async(req,res)=>{

     try {
    //the adminfi
    const adminfind = await adminModel.findOne({ email: req.body.email });
    const findUser = await userModel.findOne({ email: req.body.email });
    console.log(adminfind);
    if (adminfind) {
       var passwordMatch = await bcrypt.compare(req.body.password, adminfind.password)
      if (passwordMatch) {
          // ..... further code to maintain authentication like jwt or sessions
          req.session.isAuth = true;
          req.flash(
             "successMessage",
            `...Login successful...`);
           res.redirect("/admin/dashboard");       
       } else {
        const findUser = await userModel.findOne({ email: req.body.email });
        if (findUser) {
          var passwordMatch = await bcrypt.compare(
            req.body.password,
            findUser.password
          )
          if (passwordMatch) {
            req.session.userAuth = true;
             req.flash("successMessage", `welcome ${findUser.userName}`);
            res.redirect("/users/userdashboard");
            //  res.send("welcome");
          } else {
            req.flash("errorMessage", `wrong password or email trying to log in`);
            res.redirect("/", { title: "Home"});
          }
        }else{
          req.flash("errorMessage", `wrong password or email trying to log in`);
          res.redirect("/", { title: "Home"});
        }

        // res.render("index", { title: "Home" });
      }
//end of main admin verification
    } else if(findUser) {
      if(findUser){
  var passwordMatch = await bcrypt.compare( req.body.password, findUser.password);
         if(passwordMatch){
           req.session.userAuth = true;
           req.flash(
             "successMessage",
            `welcome ${findUser.userName}`
           );
          res.redirect("/users/dashboard");
          //  res.send("welcome");
         }
              else{
                 req.flash("errorMessage", `wrong password or email trying to log in`);
                 res.redirect("index", { title: "Home" });
                // res.render("index", { title: "Home" });
              }
      }
    }
  } catch (error) {
    console.log(error);
          req.flash("errorMessage", `wrong password or email trying to log in`);
        //  res.redirect("index", { title: "Home" });
        //  console.log(error)
         res.status(500).redirect("/");
  }
})





//main admin
router.get('/dashboard',isAuth , async(req,res)=>{

const datas = await regModel.find().sort({ createdAt : -1 }); 
const Receipt = await studentReceipt.find().sort({ createdAt: -1 });

res.render("adminPanels/admin", {
  title: " registered students",
  message: "Admin",
  result: datas,
  receipt: Receipt,
  successMessage: req.flash("successMessage"),
  // layout:'./layouts/layout'
});
});

router.get("/ReceiptPage", isAuth, async (req, res) => {
  const datas = await regModel.find().sort({ createdAt: -1 });
  const Receipt = await studentReceipt.find().sort({ createdAt: -1 });

  res.render("adminPanels/adminForRecpt", {
    title: " student receipts",
    message: "Admin",
    result: datas,
    receipt: Receipt,
    successMessage: req.flash("successMessage"),
    // layout:'./layouts/layout'
  });
});


router.post('/logout',(req,res)=>{
  

  req.session.destroy((err)=>{
    if(err) console.log(err);
    res.redirect("/");
  })
})
module.exports = router