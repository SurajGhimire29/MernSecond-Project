const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide username"],
    },
    userEmail: {
      type: String,
      required: [true, "Please provide Email"],
      unique: true,
    },
    userPhoneNumber: {
      type: Number,
      required: [true, "Please provide PhoneNumber"],
    },
    userPassword: {
      type: String,
      required: [true, "Please provide Password"],
    },
    userRole: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    otp:{
      type:Number,
    },
    isOtpVerified :{
      type: Boolean,
      default:false,
    },
    cart:[{type: Schema.Types.ObjectID,ref:"Product"}],
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User
