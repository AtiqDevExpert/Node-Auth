const mongoose = require("mongoose");
// Schemas for users
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
// usersSchema.statics.isThisEmailInUse = async function (email) {
//   try {
//     const isUserExists = await this.findOne({ email });

//     if (isUserExists) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.log("Error in method", error.message);
//     return false;
//   }
// };
// usersSchema.statics.isThisPhoneInUse = async function (phone) {
//   try {
//     const isUserExists = await this.findOne({ phone });

//     if (isUserExists) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.log("Error in method", error.message);
//     return false;
//   }
// };
const users = mongoose.model("users", usersSchema);

module.exports = users;
