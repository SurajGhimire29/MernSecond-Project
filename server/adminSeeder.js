const bcrypt = require("bcryptjs");
const User = require("./model/userModel");
const adminSeeder = async()=>{
    const isAdminExists=await User.findOne({userEmail:"admin@10gmail.com"});
if(!isAdminExists){
    await User.create({
        userEmail:"admin@10gmail.com",
        userPassword:bcrypt.hashSync("admin",10),
        userPhoneNumber:98765432345,
        userName:"admin",
        userRole:"admin",
    });
    console.log("Admin seeded successfully");

}else{
    console.log("Admin already seeder");
}
};
module.exports = adminSeeder;