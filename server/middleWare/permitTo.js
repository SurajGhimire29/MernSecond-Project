const permitTo =(...roles) =>{
    return (req,res,next)=>{
        const userRole = req.user.userRole;
        if(!roles.includes(userRole)){
            res.status(403).json({
                message:"You dont have permission for this forbidden",
            });
        }else{
            next();
        }
    }
}
module.exports = permitTo;