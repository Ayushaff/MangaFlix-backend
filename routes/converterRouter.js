const express= require('express');
const router = express.Router();

const {
    mangaConversion,
    
}=require("../controllers/converterController");
const c = require('config');
const { authMiddleware } = require('../middleware/authentication');


router.route('/mangadex').post(mangaConversion);

module.exports = router;