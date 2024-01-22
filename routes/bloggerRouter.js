const express = require('express');
const router = express.Router();

const {
    addBlogger,
    getAllBlogger,
    getBloggerById,
    deleteBlogger
} = require('../controllers/bloggerController');

router.route('/').get(getAllBlogger);
router.route('/').post(addBlogger);
router.route('/:id').get(getBloggerById);
router.route('/:id').delete(deleteBlogger);


module.exports = router;