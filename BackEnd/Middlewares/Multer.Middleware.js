import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/temp"); // folder to save files
    },
    filename: function (req, file, cb) {
        // Fix for file naming can be done here, for now we use only the original name
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage,
});
