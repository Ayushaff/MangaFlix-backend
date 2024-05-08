const express = require('express');
const router = express.Router();


const {
    getById,
    getAll,
    addWorker,
    getByUrl,
    getRandomWorker,
} = require('../controllers/workerController');
const {
    authMiddleware
} = require('../middleware/authentication');


//upload.fields([{name:'poster.original',maxCount : 1}]),


//need to add authentication
router.route('/').get(getAll);
// router.route('/:id').get(,);
router.route('/url/:url').get(getByUrl);
router.route('/').post(addWorker);
router.route('/get/random').get(getRandomWorker);

module.exports = router;