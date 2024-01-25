const path = require("path");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");
const Group = require("../model/groupModel");
const sequelize = require("../util/database");
const awsS3=require('../jobs/aws')
const { Op } = require('sequelize')


const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
    socket.on("getMessages", async (groupName) => {
      try {
        const group = await Group.findOne({ where: { name: groupName } });
        const messages = await Chat.findAll({
          where: { GroupId: group.dataValues.id },
        });
        console.log("Request Made");
        io.emit("messages", messages);
      } catch (error) {
        console.log(error);
      }
    });
  });
exports.sendMessage = async (req, res, next) => {
    try {
        const group = await Group.findOne({
            where: { name: req.body.groupName },
        });
        await Chat.create({
            name: req.user.name,
            message: req.body.message,
            UserId: req.user.id,
            GroupId: group.dataValues.id
        });
        return res.status(200).json({ message: "Success!" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error" });
    }
};

// exports.getMessages = async (req, res, next) => {
//     try {
//       const messages = await Chat.findAll();
//       return res.status(200).json({ messages: messages });
//     } catch (error) {
//       console.log(error);
//     }
//   };

// exports.getMessages = async (req, res, next) => {
//     try {
//         const param = req.query.param;
//         console.log(req.query.groupName);
//         const group = await Group.findOne({
//             where: { name: req.query.groupName },
//         });
//         console.log(group.dataValues)
//         const messages = await Chat.findAll({
//             where: {
//                 [Op.and]: {
//                     id: {
//                         [Op.gt]: Number(param),
//                     },
//                     groupId: group.dataValues.id,
//                 }
//             }
//         });
//         console.log(messages)
//         return res.status(200).json({ messages: messages });
//     } catch (error) {
//         console.log(error);
//     }
// };


exports.uploadFile=async(req,res,next)=>{
  try{
      const file = req.files.file
      console.log(file)
      const fileName = file.name;
      const fileURL= await awsS3.uploadToS3(file)
      const group = await Group.findOne({
        where: { name: req.body.groupName },
    });
    console.log("gggggg" +group.dataValues.id)
    await Chat.create({
        name: req.user.name,
        message: fileURL,
        UserId: req.user.id,
        isImage:true,
        GroupId: group.dataValues.id
    });
      res.status(200).json({message:"file uploaded",success:true})
  }catch(err){
      console.log(err);
      res.status(500).json({message:"Something went Wrong",err:err,success:false})
  }
}