const express = require('express');
const router = express.Router();

const {
    addBlogger,
    getAllBlogger,
    getBloggerById,
    deleteBlogger,
    editBlogger
} = require('../controllers/bloggerController');
const { authMiddleware } = require('../middleware/authentication');

router.route('/').get(authMiddleware,getAllBlogger);
router.route('/').post(authMiddleware,addBlogger);
router.route('/:id').get(authMiddleware,getBloggerById);
router.route('/:id').delete(authMiddleware,deleteBlogger);
router.route('/:id').put(authMiddleware,editBlogger);


module.exports = router;