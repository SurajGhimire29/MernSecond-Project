const jwt =require("jsonwebtoken")
const{promisify}=require("util");
const User = require("../model/userModel");
const isAuthenticated =async(req,res,next)=>{
   // console.log("authentication   cation is done")
    const token = req.headers.authorization
    try {  if(!token){
    return res.status(403).json({
        message:"please send token"
    })
   }
const decoded = await promisify(jwt.verify)(token,process.env.SECRET_KEY)
const doesUserExit = await User.findOne({_id:decoded.id});
if(!doesUserExit){
    return res.status(404).json({
        message:"User doesnot exist with that token/id"
    })
}
req.user=doesUserExit
next();
        
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
 
//    Jwt.verify(token,process.env.SECRET_KEY,(err,sucess)=>{
//     if(err){

//         res.status(400).json({
//             message:"Invalid token"
//         })
//     }else{
//         res.status(200).json({
//             message:"Valid token"
//         })
//     }
// })


    //next();onsole.log
};





module.exports = isAuthenticated