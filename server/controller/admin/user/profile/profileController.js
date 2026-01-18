const User = require("../../../../model/userModel");



//get my profile controller'
exports.getMyProfile = async (req,res)=>{
    const userId = req.user.id;
    const myProfile = await User.findById(userID);

    //send response
    res.status(200).json({
        data:myProfile,
        message:"profile fetched successfully"
    })
};