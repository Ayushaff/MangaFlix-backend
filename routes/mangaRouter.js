const express = require('express');
const router = express.Router();
const multer = require('multer')


const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        return cb(null,"./public/");
    },
    filename: (req,file,cb)=>{
        console.log(file.originalname);
        return cb(null,`imagefile.jpg`);
    }
});
const upload = multer({ storage: storage });


const {
    getAll,
    addManga,
    deleteManga,
    getMangaById,
    updateManga
} = require('../controllers/mangaController');
const {
    authMiddleware
} = require('../middleware/authentication');


//upload.fields([{name:'poster.original',maxCount : 1}]),

router.route('/').get(getAll);
router.route('/').post(upload.any(),addManga);
router.route('/').put(updateManga);
router.route('/:id').get(getMangaById);
router.route('/:id').delete(deleteManga);


module.exports = router;