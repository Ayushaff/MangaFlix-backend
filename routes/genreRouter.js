const express = require('express');
const router = express.Router();

const {
    addGenre,
    getAllGenre,
    getGenreById
} = require('../controllers/genreController');

router.route('/').get(getAllGenre);
router.route('/').post(addGenre);
router.route('/:id').get(getGenreById);


module.exports = router;