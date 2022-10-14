let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usersSchema = new Schema(
  {
    userName:{
        type:String,
        required:true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// adminSchema.email = 'talktosme@fgmail.com'
// adminSchema.password = 'givitec2022'
let usersModel = mongoose.model("user", usersSchema);

module.exports = usersModel;
