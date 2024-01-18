const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController');

const router = express.Router();
const upload = multer();

router.post('/upload', upload.single('image'), fileController.uploadFile);

module.exports = router;
