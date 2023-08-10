const path = require ('path')
const createHttpError = require('http-errors');
const {STATIC_FOLDER,IMAGES_FOLDER} = require ('../constants')

const multer = require('multer');

//новый путь для сохранения и имя файла 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(STATIC_FOLDER, IMAGES_FOLDER));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const fileFilter = (req, file, cb) => {
    const MIMETYPES = ["image/jpg", "image/gif", "image/png"];
    if (MIMETYPES.some(mimetype => mimetype === file.mimetype)) {
      return cb(null, true);
    } else {
      cb(createHttpError(415, "Support only jpeg/gif/png files"));
    }
};

const upload = multer({ storage, fileFilter});

module.exports.uploadHeroFile = upload.single("heroPhoto");