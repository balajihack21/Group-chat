const express = require("express");
const router = express.Router();
const chatController = require("../controller/chatController");
const userAuthentication = require("../middleware/auth");

router.post("/send-message", userAuthentication, chatController.sendMessage);
// router.get("/getMessages", chatController.getMessages);
// router.get("/getMessages/:param", chatController.getMessages);
router.post("/send-file",userAuthentication,chatController.uploadFile)

module.exports = router;
