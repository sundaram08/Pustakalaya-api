const multer = require('multer')
const path = require('path');

// const uploadPath = path.join(__dirname, '..', 'public', 'temp');   EROFS error
const uploadPath = '/tmp';
const storage = multer.diskStorage({
  destination: function (req, file ,cb){
    cb(null,uploadPath);
  },
  filename:function(req,file,cb){
    cb(null, file.originalname)
  }
})

const upload = multer({ storage });

module.exports = { upload };
