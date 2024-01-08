const express = require('express');
const router = express.Router();

const {
    getAll,
    getById,
    add
} = require('../controllers/coverController');
const {
    authMiddleware
} = require('../middleware/authentication');

router.route('/').get(getAll);
router.route('/:id').get(getById);
router.route('/').post(add);



module.exports = router;