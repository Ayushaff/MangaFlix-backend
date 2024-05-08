const express = require('express');
const router = express.Router();

const {
    addGenre,
    getAllGenre,
    getGenreById,
    deleteGenre,
    updateGenre
} = require('../controllers/genreController');
const { authMiddleware } = require('../middleware/authentication');

router.route('/').get(getAllGenre);
router.route('/').post(authMiddleware,addGenre);
router.route('/').put(authMiddleware,updateGenre);
router.route('/:id').get(getGenreById);
router.route('/:id').delete(authMiddleware,deleteGenre);


module.exports = router;