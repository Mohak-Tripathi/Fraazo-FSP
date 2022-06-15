const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: false },
  address: { type: String, required: false, default: null },
},
{
    versionKey: false, timestamps: true 
}
);

userSchema.pre("save", function (next) {  // pre is hook or middleware
  const hash = bcrypt.hashSync(this.password, 8);    //this.password=> remember object => this.pass inside method in object.
  
  this.password = hash;
  return next();
});
// Note= Don't use arrow function. Arraow function doesn't have "this" value"
// Note- Pre is method=> So before creatig or updating = this callbackfunction will run .



userSchema.methods.checkPassword = function (password) { // I am creating mu own method im mongoose model
    // console.log('password:', password,'this : ',this.password)
    return bcrypt.compareSync(password, this.password)
} // here password jo user is writing in req.body but this.password is that hash password in the system

const User = mongoose.model("user", userSchema);

module.exports = User;

