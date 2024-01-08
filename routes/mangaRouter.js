const express = require('express');
const router = express.Router();

const {
    getAll,
    addManga
} = require('../controllers/mangaController');
const {
    authMiddleware
} = require('../middleware/authentication');

router.route('/').get(getAll);
router.route('/').post(addManga);


module.exports = router;