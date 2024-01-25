const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");
const Authentication = require("../middleware/auth");

router.post("/create-group", Authentication, groupController.createGroup);

router.post("/add-to-group", Authentication, groupController.addToGroup);

router.get("/get-groups", Authentication, groupController.getGroups);

router.post("/delete-from-group",Authentication,groupController.deleteFromGroup);

router.get("/group-members/:groupName",Authentication,groupController.groupMembers);

module.exports = router;