const users = require("../models/user");
const bcrypt = require("bcrypt");
const { sendConfirmationEmail } = require("../middleware/mail");
const { firebaseUploader } = require("../middleware/firebaseUploader");

const { generateOTP } = require("../service/otpGenerator");
const { setUser } = require("../middleware/auth");

const handleGetAllUsers = async (req, res) => {
  try {
    const allDbUser = await users.find({});
    if (allDbUser.length > 0) {
      return res.json(allDbUser);
    } else {
      return res.json({ errors: "no users found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleGetUserById = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleUpdateUserById = async (req, res) => {
  try {
    const user = await users.findByIdAndUpdate(req.params.id);

    const newData = req.body;
    if (user !== undefined) {
      // Exclude _id field from newData
      delete newData._id;
      const updatedUser = Object.assign(user, newData);
      await users.updateOne({ _id: req.params.id }, updatedUser);
      return res.status(201).json({
        status: "Record Updated Successfully",
        User: user._id,
      });
    } else {
      return res.status(404).json({
        error: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleDeleteUserbyId = async (req, res) => {
  try {
    const deletedUser = await users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (deletedUser) {
      return res.json({ status: "Delete Successfully", user: deletedUser });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleCreateNewUser = async (req, res) => {
  const otp = generateOTP();

  try {
    const {
      name,
      phone,
      role,
      email,
      password,
      confirmPassword,
      profilePicture,
    } = req.body;

    const existingUser = await users.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User with the same email or phone already exists",
      });
    }

    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new users({
      name,
      phone,
      role,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      profilePicture: profilePicture,
      isVerified: false,
      verificationCode: otp,
    });
    if (req.file) {
      const folderName = "users";
      const databseURL = await firebaseUploader(req.file, folderName);
      user.profilePicture = databseURL.downloadURL;
    }

    await user.save();

    await sendConfirmationEmail(email, otp);
    return res
      .status(200)
      .json({ id: user._id, message: "OTP successfully sent to your email" });
  } catch (error) {
    console.error("Error creating new user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleVerifyOtpUserCreation = async (req, res) => {
  const id = req.params.id;
  const { otp } = req.body;
  try {
    const user = await users.findByIdAndUpdate(id, { verificationCode: otp });

    if (!user || user.verificationCode !== otp) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    user.isVerified = true;
    user.verificationCode = undefined; // Clear verificationCode
    await user.save();

    const data = {
      userId: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      isVerified: user.isVerified,
    };

    return res
      .status(201)
      .json({ user: data, message: "User created and verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleVerifyhOtpCreatePassword = async (req, res) => {
  const id = req.params.id;
  const { otp } = req.body;
  try {
    const user = await users.findByIdAndUpdate(id, { verificationCode: otp });

    if (!user || user.verificationCode !== otp) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    user.isVerified = true;
    user.verificationCode = undefined; // Clear verificationCode
    await user.save();

    return res
      .status(202)
      .json({ id: user._id, message: "Otp verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleVerifyUserEmail = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(409).json({ message: "User with email not found" });
    }
    user.verificationCode = otp;
    await user.save();
    sendConfirmationEmail(email, otp);
    return res
      .status(200)
      .json({ id: user._id, message: "OTP successfully send to your email" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleResendOtp = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await users.findByIdAndUpdate(id);

    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }

    sendConfirmationEmail(user.email, user.verificationCode);
    return res
      .status(201)
      .json({ id: user._id, message: "OTP successfully send to your email" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const handleCreateNewPassword = async (req, res) => {
  const id = req.params.id;
  const { password, confirmPassword } = req.body;

  try {
    const user = await users.findByIdAndUpdate(id, { verificationCode: otp });

    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ id: user._id, message: "Password successfully Updated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const otp = generateOTP();
    const { email, password } = req.body;
    const isUser = await users.findOne({ email });
    if (isUser) {
      const isPasswordValid = await bcrypt.compare(password, isUser.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      if (!isUser.isVerified) {
        isUser.verificationCode = otp;
        await isUser.save();
        sendConfirmationEmail(email, otp);
        console.log(isUser);
        return res.status(203).json({
          message:
            "User is not verified , otp send to your email please verified to login",
        });
      }
      const token = setUser(isUser);
      const user = {
        _id: isUser._id,
        name: isUser.name,
        email: isUser.email,
        phone: isUser.phone,
        role: isUser.role,
        profilePicture: isUser.profilePicture,
      };
      return res.status(200).json({
        data: user,
        token: token,
        message: "User login Successfuly",
      });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
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
};
