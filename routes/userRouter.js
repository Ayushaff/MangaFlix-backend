//module imports
const express = require('express');
const router = express.Router();

//controller imports
const {
    signInUser,
    signUpUser,
    deleteUser,
    getAllUsers,
    updateUser,
    getById,
} = require('../controllers/userController');
const {
    authMiddleware,
} = require("../middleware/authentication");

//routing the paths to controllers
router.route('/signin').post(signInUser);//login
router.route('/signup').post(signUpUser);
router.route('/user').get(authMiddleware,getAllUsers);
router.route('/user/:id').get(authMiddleware,getById);
router.route('/user/:id').delete(authMiddleware,deleteUser);
router.route('/user/:id').put(authMiddleware,updateUser);
router.route('/me').get(authMiddleware, getById);

//exports
module.exports = router;