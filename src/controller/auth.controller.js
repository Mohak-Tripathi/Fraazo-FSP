const User = require("../models/user.model");

const jwt = require("jsonwebtoken");



require("dotenv").config(); // for dotenv environment variable . TO HIDE SERCET KEY




// function for generating new token

const generateToken = (user) => {

// console.log(process.env)
// console.log(process.env.SECRET_KEY)
  return jwt.sign({ user }, "masaischool");

//   return jwt.sign({ user }, process.env.SECRET_KEY); //taking whole user and returning it back with token
  // .env file should be in root directory
};


const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    // checking email
    if (user) {
      return res.status(400).send({ message: "Email already Exist" });
    }

    // if new user, create it
    user = await User.create(req.body);

    const token = generateToken(user);

    return res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const login = async(req, res) => {
  try {

    const user = await User.findOne({email: req.body.email});

    //checked if mail exists
if(!user){
    return res.status(400).send({ message: "Wrong Email or Password" });
}



// if email exists, check Password
const match = user.checkPassword(req.body.password)

// password not matches
if(!match){
    return res.status(400).send({ message: "Wrong email and password"})
}

// if password also matches
const token = generateToken(user);

return res.status(200).send({ user, token });


  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { register, login , generateToken}; // i don't think generate token is needed
