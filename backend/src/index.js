const express= require('express')

const app = express()

const frazoProductController= require("./controller/frazo.controller")
const userController = require("./controller/user.controller");
const {register, login} = require('./controller/auth.controller')



app.use(express.json()) // express can't read json body. So we need to provide middleware "json"






app.use("/user", userController);
//in register and login we don't write => /user/register or /user/login => we directly do /register or /login => So masaischool/register
// for building this. we will create authController

app.post("/register", register)
app.post("/login", login)

app.use("/products", frazoProductController)
module.exports = app; 

