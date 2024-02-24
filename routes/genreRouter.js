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

router.route('/').get(authMiddleware,getAllGenre);
router.route('/').post(authMiddleware,addGenre);
router.route('/').put(authMiddleware,updateGenre);
router.route('/:id').get(authMiddleware,getGenreById);
router.route('/:id').delete(authMiddleware,deleteGenre);


module.exports = router;