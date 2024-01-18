const express= require('express');
const router = express.Router();

const {
    mangaConversion,
    
}=require("../controllers/converterController");
const c = require('config');


router.route('/manga').post(mangaConversion);

module.exports = router;