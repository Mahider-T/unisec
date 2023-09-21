const multer = require('multer');
const diskStorage = multer.diskStorage;

const storage = diskStorage({
    destination: "./uploads/events",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

const upload = multer({
    storage,
})

// export default upload
module.exports = upload;