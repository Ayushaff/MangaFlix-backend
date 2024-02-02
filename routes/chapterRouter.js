const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const chapterId = req.body.chapterId;
        //console.log(chapterId);
        const folderName = `controllers/workerTemp/${chapterId}`;
        fs.mkdir(folderName, (err) => {
            if (err) {
                if(err.code === "EEXIST"){
                    return cb(null, `controllers/workerTemp/${chapterId}/`);
                }else{
                    console.error('Error creating folder:', err);
                    return null;
                }
                
            } else {
                
                return cb(null, `controllers/workerTemp/${chapterId}/`);
            }
        });
    },
    filename: (req, file, cb) => {
        //console.log(file.originalname);
        return cb(null, `${file.originalname}`);
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
router.route('/').post(upload.any(), addChapter);
router.route('/:id').delete(deleteChapter);


module.exports = router;