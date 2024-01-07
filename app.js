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

app.use("/", userRouter);
app.use("/user", userRouter);



sequelize.sync()
    .then(res=>{
      app.listen(process.env.PORT)
    })
    .catch(err=>{
        console.log(err)
    })





