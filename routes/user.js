const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserbyId,
  handleCreateNewUser,
  handleLoginUser,
  handleVerifyOtpUserCreation,
  handleResendOtp,
  handleVerifyUserEmail,
  handleVerifyhOtpCreatePassword,
  handleCreateNewPassword,
} = require("../controllers/user");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, handleGetAllUsers);
// CRUD operations on the user collection

router
  .route("/:id")
  .get(verifyToken, handleGetUserById)
  .patch(verifyToken, handleUpdateUserById)
  .delete(verifyToken, handleDeleteUserbyId);
router.post("/signup", upload.single("profilePicture"), handleCreateNewUser);
router.post("/login", handleLoginUser);
router.post("/verifyotp/:id", handleVerifyOtpUserCreation);
router.post("/resendotp/:id", handleResendOtp);
router.post("/verifyuseremail", handleVerifyUserEmail);
router.post("/verifyotpcreatepassword/:id", handleVerifyhOtpCreatePassword);
router.post("/createnewpassword/:id", handleCreateNewPassword);

module.exports = router;
