const express = require('express');
const router = express.Router();


const {
    getById,
    getAll,
    addWorker,
    getByUrl,
} = require('../controllers/workerController');
const {
    authMiddleware
} = require('../middleware/authentication');


//upload.fields([{name:'poster.original',maxCount : 1}]),

router.route('/').get(getAll);
router.route('/:id').get(getById);
router.route('/url/:url').get(getByUrl);
router.route('/').post(addWorker);


module.exports = router;