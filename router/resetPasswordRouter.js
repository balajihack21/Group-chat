const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controller/resetPasswordController");

router.get("/forgot-password", resetPasswordController.forgotPasswordPage);
router.post("/send-mail", resetPasswordController.sendMail);
router.get(
  "/reset/:requestId",resetPasswordController.resetPasswordPage);
router.post("/password-reset", resetPasswordController.updatePassword);

module.exports = router;
