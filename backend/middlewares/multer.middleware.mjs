import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload")
    },
    filename: function (req, file, cb){
        const uniquesPrefix = `${file.fieldname}${Date.now()}`
        cb(null, `${uniquesPrefix}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true)
    } else {
        cb(new Error(`Only images are allowed`))
    }
}

export const upload = multer({
    storage,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: fileFilter
})