let mongoose = require('mongoose')


let regSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  othernames: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  incomePmonth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  relationshiptochild: {
    type: String,
    required: true,
  },
  childsname: {
    type: String,
    required: true,
  },
  childage: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  childclass: {
    type: String,
    required: true,
  },
  childFschool: {
    type: String,
    required: true,
  },
  childsFclass: {
    type: String,
    required: true,
  },
  studentID:{
    type: String,
    required:true,
  },
}, {timestamps: true});

const RegModel = mongoose.model('reg',regSchema);

module.exports = RegModel;