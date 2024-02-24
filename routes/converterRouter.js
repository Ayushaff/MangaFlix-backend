const express= require('express');
const router = express.Router();

const {
    mangaConversion,
    
}=require("../controllers/converterController");
const c = require('config');
const { authMiddleware } = require('../middleware/authentication');


router.route('/manga').post(authMiddleware,mangaConversion);

module.exports = router;