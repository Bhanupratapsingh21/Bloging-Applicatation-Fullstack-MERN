import multer from "multer";
import path from "path"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Public/temp") // folder to save files
    },
    filename: function (req, file, cb) {
        /*
        fix for file nameing can be done here can be date + name + etc for now only name we use 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
         cb(null, file.originalname + '-' + uniqueSuffix)
        */
        cb(null, file.originalname)
    }
  })
  
  
export const upload =  multer({
     storage,
})