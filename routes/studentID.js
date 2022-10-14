const express = require('express');
const router = express.Router();
const regModel = require('../models/reg')
const receiptModel = require('../models/receipt')

//adminAuth
const isAuth = require('../authentication/adminAuth')
const userAuth = require('../authentication/usersAuth')

//Admin view
router.get('/:id',isAuth, async(req,res)=>{
  try {
     const student = await regModel.findById(req.params.id);
     if(student){
       res.render("view/viewReg", {
         details: student,
         title: "view page",
         layout: "./layouts/viewLayout"
       });
     }
     else{
      const receipt = await receiptModel.findById(req.params.id);
      res.render("view/viewReceipt", {
        rcpt: receipt,
        title: "view page",
        layout: "./layouts/viewLayout"
      });
      //  res.send(' show students datas '+ req.params.id)
     }
  } catch (error) {
    
  }
});


//edit student registration route
router.get("/:id/edit", isAuth, async (req, res) => {
//   res.send(" edit receipt" + req.params.id);
    try {
        const student = await regModel.findById(req.params.id);
        // const receipt = await receiptModel.findById(req.params.id);
        res.render('editStudentReg', {details: student, title: 'Edit page'})
    } catch (error) {
        res.redirect('/studentID')
    }
});

//edit student receipt route
router.get("/:id/edits", isAuth, async (req, res) => {
//   res.send(" edit receipt" + req.params.id);
    try {
        // const student = await regModel.findById(req.params.id);
        const receipt = await receiptModel.findById(req.params.id);
        res.render('editRceipt', {recpt: receipt, title: 'Edit page'})
    } catch (error) {
        res.redirect('/studentID')
    }
});


//the update route
router.put("/:id", isAuth, async (req, res) => {
  // res.send('update receipt '+ req.params.id)
  let student;
  let receipt;
  try {
    student = await regModel.findById(req.params.id);
    if(student){
      // save editted student detais
      student.surname = req.body.surname;
      student.firstname = req.body.firstname;
      student.othernames = req.body.othernames;
      student.occupation = req.body.occupation;
      student.incomePmonth = req.body.incomePmonth;
      student.address = req.body.address;
      student.phonenumber = req.body.phonenumber;
      student.relationshiptochild = req.body.relationshiptochild;
      student.childsname = req.body.childsname;
      student.childage = req.body.childage;
      student.gender = req.body.gender;
      student.childclass = req.body.childclass;
      student.childFschool = req.body.childFschool;
      student.childclass = req.body.childclass;
      await student.save();
      req.flash("successMessage", `The update of the student with this id :${student.studentID} was successful !!!`);
      res.redirect("/admin/dashboard");
    }
    else{
      receipt = await receiptModel.findById(req.params.id);
      // save edited receipt details
      receipt.childsName = req.body.childsName;
      receipt.totalAmount = req.body.totalAmount;
      receipt.amountPaying = req.body.amountPaying;
      receipt.amountOwing = req.body.amountOwing;
      await receipt.save();
       req.flash("successMessage", `Receipt updated successfully !!!`)
      res.redirect("/admin/ReceiptPage");
    }
  } catch (error) {
    if (student == null) {
      console.log("student is null");
      res.redirect("/admin/dashboard");
    } else {
      console.log(error);
    }
  }
});



// router.delete("/:id", isAuth, async (req, res) => {
//   //   res.send(" delete receipt" + req.params.id);
//   let student;
//   try {
//     student = await regModel.findById(req.params.id);
//     await student.remove(); //removing the entire documents
//     res.redirect("admin/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// });

/**
 * method-override allows us to take post form send it to our server
 * and then manipulate the request if we are either making a delete request or
 * put request
 */
module.exports = router;
