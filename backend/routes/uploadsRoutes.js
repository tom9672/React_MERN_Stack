import express from 'express'
import multer from 'multer'
import path from 'path'
const router = express.Router()

// create disk save engine
const storage=multer.diskStorage({
    destination(req, file, cb) {
        cb(null,'uploads/')},
    filename(req, file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

// check file type
const checkFileType=(file,cb) =>{
    const fileTypes = /jpg|jepg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)
    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb(new Error('Only images allow'))
    }
}

// upload file
const upload = multer({storage, fileFilter:function(req,file,cb){
    checkFileType(file,cb)
}})

router.post('/', upload.single('image'), (req,res)=>{
    res.send(`/${req.file.path}`)
})

export default router