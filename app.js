const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()

app.use(cors())
app.use(bodyparser.json())
app.use(express.static('public'))

const sequelize=require('./util/database')
const userRouter=require('./router/userRouter')
const resetPasswordRouter=require('./router/resetPasswordRouter')
const homePageRouter=require('./router/homePageRouter')
const User=require('./model/userModel')
const ResetPassword = require("./model/resetPasswordModel");

app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/password", resetPasswordRouter);

app.use("/homePage", homePageRouter);


ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);

sequelize.sync()
    .then(res=>{
      app.listen(process.env.PORT)
    })
    .catch(err=>{
        console.log(err)
    })





