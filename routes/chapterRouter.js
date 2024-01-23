const express = require('express');
const router = express.Router();


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
router.route('/').post(addChapter);
router.route('/:id').delete(deleteChapter);


module.exports = router;