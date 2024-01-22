const express = require('express');
const router = express.Router();

const {
    addGenre,
    getAllGenre,
    getGenreById,
    deleteGenre,
    updateGenre
} = require('../controllers/genreController');

router.route('/').get(getAllGenre);
router.route('/').post(addGenre);
router.route('/').put(updateGenre);
router.route('/:id').get(getGenreById);
router.route('/:id').delete(deleteGenre);


module.exports = router;