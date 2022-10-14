var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
let bcrypt = require("bcrypt");
let session = require('express-session');
let mongoDBsession = require('connect-mongodb-session')(session);
let flash = require('connect-flash');
var expressLayout = require("express-ejs-layouts");

//method-override
let methodOverride = require('method-override')
//models
let adminModel = require("./models/admin");
let adminRouter = require('./routes/admin')

var indexRouter = require('./routes/index');
var receiptRouter = require('./routes/receipt');
var studentRouter = require('./routes/studentID')
var usersRouter = require('./routes/users')

var app = express();

//mongodb
const url = "mongodb://localhost:27017/PDS";
mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true})
  .then((data)=>{console.log(`server is up \nhttp://localhost:9000`);})
  .catch((err)=>{console.log(err)});

  //creating a store
  const store = new mongoDBsession({
    uri : url,
    collection: 'mySession',
  });



// view engine setup
app.use(expressLayout);
app.set('layout','./layouts/layout')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret:'key that will sign cookie',
  resave: false,
  saveUninitialized: false,
  store: store, //this store is equal to the new mongDBsession store
}))

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())


//check if this is the user

//manual inputting of admin details manually
app.get('/adminReg',async(req,res) => {

  // const admin = new adminModel({
  //   email: "talktosme@gmail.com",
  //   password: "givitec2022",
  // });
  // admin.save()
  // .then((data)=>{
  //   console.log(`data save`)
  // }).catch((err)=>{console.log(err)})
  const adminDetails= {
    saltRounds : 10,
    password : "givitec2022",
    email : "talktosme@gmail.com",
  }

  try {
    const hashedPwd = await bcrypt.hash(adminDetails.password, adminDetails.saltRounds);
    let admin = new adminModel({
      email: adminDetails.email,
      password: hashedPwd,
    });

    admin.save()
    .then((data)=>{
      // res.send(insertResult);
      console.log(`admin is recorded`);
    }).catch((err)=>{console.log(err)})

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
}); 


app.use('/', indexRouter);
app.use('/receipt', receiptRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter)
app.use('/:id', studentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
