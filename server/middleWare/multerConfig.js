const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedFileTypes= ["image/png","image/jpg","image/jpeg"];
    if(!allowedFileTypes.includes(file.mimetype)){
        cb(new Error("This filetype is not supported"))
    
    return
}
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, uniqueSuffix + ext);
  }
})

const upload = multer({ storage: storage });
module.exports = upload;