let mongoose = require('mongoose')
let Schema = mongoose.Schema

let adminSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true});
// adminSchema.email = 'talktosme@fgmail.com'
// adminSchema.password = 'givitec2022'
let adminModel = mongoose.model('admin',adminSchema);

module.exports = adminModel;