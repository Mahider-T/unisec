const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        // cb(null, '../client/public/images')
        cb(null, '../uploads/news')
        //change the path
    },
    filename:(req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {

    console.log(file.mimetype)
    const type = file.mimetype.split('/');//to get the image text 
    if(type[0] === 'image'){
        cb(null, true)   
    }    
    else{
        cb(new Error('File must be of type image'), false )
    }
}

const uploadImage =
    multer({
        storage: storage,
        fileFilter: fileFilter,
        limits:{
            fileSize: 1024 * 1024
        }
    })


module.exports = uploadImage;