const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(cors())
app.use(bodyparser.json())
app.use(express.static('public'))

const sequelize=require('./util/database')
const userRouter=require('./router/userRouter')
const resetPasswordRouter=require('./router/resetPasswordRouter')
const homePageRouter=require('./router/homePageRouter')
const chatRouter=require('./router/chatRouter')
const groupRouter = require("./router/groupRouter");
const User=require('./model/userModel')
const ResetPassword = require("./model/resetPasswordModel");
const Chat=require('./model/chatModel')
const Group = require("./model/groupModel");
const UserGroup = require("./model/userGroup");
// const check=require('./jobs/aws')

app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/password", resetPasswordRouter);

app.use("/home", homePageRouter);
app.use("/chat",chatRouter)
app.use("/group", groupRouter);

User.hasMany(ResetPassword);
ResetPassword.belongsTo(User);

User.hasMany(Chat, { onDelete: "CASCADE", hooks: true });
Chat.belongsTo(User)

Group.hasMany(Chat);
Chat.belongsTo(Group);

User.hasMany(UserGroup);
UserGroup.belongsTo(User);


Group.hasMany(UserGroup);
UserGroup.belongsTo(Group);


const job = require("./jobs/cron");
job.start();

sequelize
// .sync({force:true})
  .sync()
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err)=>{
    console.log(err)
  })
