import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const pinataStorage=multer.memoryStorage()

export const pinataUpload=multer({storage:pinataStorage})

export const upload = multer({ storage });
