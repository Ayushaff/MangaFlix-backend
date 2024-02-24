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

router.route('/').get(authMiddleware,getAll);
router.route('/:id').get(authMiddleware,);
router.route('/url/:url').get(authMiddleware,getByUrl);
router.route('/').post(authMiddleware,addWorker);
router.route('/get/random').get(authMiddleware,getRandomWorker);

module.exports = router;