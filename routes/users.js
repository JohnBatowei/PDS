const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/users')
let regModel = require("../models/reg");
let studentReceipt = require("../models/receipt");
const receiptModel = require("../models/receipt");


const userAuth = require("../authentication/usersAuth");
router.post('/', async (req, res) => {
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        let users = new userModel({userName: req.body.userName, email: req.body.email, password: hashedPwd});

        users.save().then((data) => {
            req.flash("successMessage", `welcome ${
                users.userName
            } you are now an admin`);
            res.redirect("/");
            // res.send(users.userName +' you are now an admin')
        }).catch((err) => {
            res.send(err)
        })
    } catch (err) {
        console.log(err)
    }
})

// users
router.get("/dashboard", userAuth, async (req, res) => {
    // const users = await userModel.findOne();
    // let a = users.userName

    const datas = await regModel.find().sort({createdAt: -1});
    const Receipt = await studentReceipt.find().sort({createdAt: -1});

    res.render("adminPanels/userAdmin", {
      title: "Registered students",
      successMessage: req.flash("successMessage"),
      message: `User`,
      result: datas,
      receipt: Receipt,
      layout: "./layouts/userLayout",
    });
});

router.get("/ReceiptPage", userAuth, async (req, res) => {
  const datas = await regModel.find().sort({ createdAt: -1 });
  const Receipt = await studentReceipt.find().sort({ createdAt: -1 });

  res.render("adminPanels/userAdReceipt", {
    title: " student receipts",
    message: "User",
    result: datas,
    receipt: Receipt,
    successMessage: req.flash("successMessage"),
    layout: "./layouts/userLayout",
  });
});

// user view
router.get("/:id", userAuth, async (req, res) => {
    try {
        const student = await regModel.findById(req.params.id);
        if (student) {
            res.render("view/userViewReg", {
              details: student,
              title: "view page",
              layout: "./layouts/viewLayout",
            });
        } else {
            const receipt = await receiptModel.findById(req.params.id);
            res.render("view/userViewRecpt", {
              rcpt: receipt,
              title: "view page",
              layout: "./layouts/viewLayout",
            });
            // res.send(' show students datas '+ req.params.id)
        }
    } catch (error) {
        console.log(error)
    }
});


// edit student registration route
router.get("/:id/edit", userAuth, async (req, res) => { // res.send(" edit receipt" + req.params.id);
    try {
        const student = await regModel.findById(req.params.id);
        // const receipt = await receiptModel.findById(req.params.id);
        res.render("editUserReg", {
          details: student,
          title: "Edit page",
          layout: "./layouts/userLayout",
        });
    } catch (error) {
        res.redirect('/users')
    }
});

// edit student receipt route
router.get("/:id/edits", userAuth, async (req, res) => { // res.send(" edit receipt" + req.params.id);
    try { // const student = await regModel.findById(req.params.id);
        const receipt = await receiptModel.findById(req.params.id);
        res.render('editUserRcpt', {
            recpt: receipt,
            title: 'Edit page'
        })
    } catch (error) {
        res.redirect('/users')
    }
});

router.put("/:id", userAuth, async (req, res) => { 
    // res.send('update receipt '+ req.params.id)
    let student;
    // let receipt;
    try {
        student = await regModel.findById(req.params.id);
        if (student) { // save editted student detais
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
             req.flash(
               "successMessage",
               `The update of the student with this id :${student.studentID} was successful !!!`
             );
            res.redirect("/users/dashboard");
        } else {
            // receipt = await receiptModel.findById(req.params.id);
            // // save edited receipt details
            // receipt.childsName = req.body.childsName;
            // receipt.totalAmount = req.body.totalAmount;
            // receipt.amountPaying = req.body.amountPaying;
            // receipt.amountOwing = req.body.amountOwing;
            // await receipt.save();
            res.redirect("/users/dashboard");
        }
    } catch (error) {
        if (student == null) {
            console.log("student is null");
            res.redirect("/users/dashboard");
        } else {
            console.log(error);
        }
    }
});


module.exports = router;
