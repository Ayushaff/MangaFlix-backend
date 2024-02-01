const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        return cb(null,"controllers/workerTemp/");
    },
    filename: (req,file,cb)=>{
        console.log(file.originalname);
        return cb(null,`imagefile.jpg`);
    }
});

const upload = multer({ storage: storage });

const {
    getById,
    getByMangaId,
    addChapter,
    deleteChapter,
} = require('../controllers/chapterController');
const {
    authMiddleware
} = require('../middleware/authentication');


//upload.fields([{name:'poster.original',maxCount : 1}]),

router.route('/:id').get(getById);
router.route('/mangaId/:id').get(getByMangaId);
router.route('/').post(upload.any(),addChapter);
router.route('/:id').delete(deleteChapter);


module.exports = router;