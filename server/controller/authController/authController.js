const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../model/userModel");
const sendEmail = require("../../services/sendEmail");

exports.userRegister = async (req, res) => {
  //Alternative (object destructuring)
  const { username, email, phoneNumber, password } = req.body;

  if (!username || !email || !phoneNumber || !password) {
    return res.status(400).json({
      message: "Please Provide UserName, Email, PhoneNumber, Password",
    });
  }
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User With That email is already registered",
    });
  }
  // Insert to database logic goes here
  await User.create({
    userName: username,
    userEmail: email,
    userPhoneNumber: phoneNumber,
    userPassword: bcrypt.hashSync(password, 12),
  });

  res.json({
    status: 201,
    message: "Success",
  });
};
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "UserEmail or password is incorrect",
    });
  }
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(400).json({
      message: "User With That email is not registered",
    });
  }
  //password check
  const isMatch = bcrypt.compareSync(password, userFound[0].userPassword);
  if (isMatch) {
    //generate token
    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } else {
    res.status(404).json({
      message: "Invalid password",
    });
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please provide Email",
    });
  }
  //check if that email is register or not
  const userExist = await User.find({ userEmail: email });
  if (!userExist) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  //send OTP to that email
  const otp = Math.floor(1000 + Math.random() * 9000);
  userExist[0].otp = otp;
  await userExist[0].save();
  await sendEmail({
    email: email,
    subject: "YOUR OTP for digitalMOMO forgot password",
    message: `YOUR OTP IS ${otp}.Don't share with anyone.`,
  });

  res.json({
    message: "Forgot Password OTP is sended",
    otp: otp,
  });
};
//verify  opt
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide email or otp",
    });
  }
  //check if that otp is correct or not for that email
  const userExist = await User.find({ userEmail: email });
  if (userExist.length == 0) {
    return res.status(400).json({
      message: "Email is not register",
    });
  }
  if (userExist[0].otp !== otp) {
    return res.status(400).json({
      message: "invalid otp",
    });
  } else userExist[0].otp = undefined;
  userExist[0].isOtpVerified = true;
  await userExist[0].save();
  res.status(200).json({
    message: "otp is correct",
  });
};
exports.resetPassword = async (req, res)=>{
    const {email, newPassword, confirmPassword} = req.body;
    if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
        message: "Please Provide Email, New Password, Confirm Password",
      });
    }
    if (newPassword !== confirmPassword){
      return res.status(400).json({
        message: "New Password and Confirm Password is not same",
      })
    }
    const userExist = await User.find({ userEmail : email});
    if (userExist.length == 0){
      return res.status(404).json({
        message: "Email is not registered"
      })
    }
    if (userExist[0].isOtpVerified !==true){
      return res.status(403).json({
        message: "You cannot perform this action",
      })
    }
    userExist[0].userPassword = bcrypt.hashSync(newPassword, 10);
    userExist[0].isOtpVerified = false;
    await userExist[0].save();
    res.status(404).json({
      message: "Password is Changed Sucessfully",
    })
  }