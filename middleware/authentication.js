const { Unauthorized } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require('../models/roleModel');
const config = require('config');


const authMiddleware = async (req, res, next) => {
  const  access_token  = req.headers['x-auth-token'];
  console.log(access_token);
  if (!access_token) {
    throw new Unauthorized(
      `No token to access this route , please sign in to access`
    );
  }
  const decodedData = jwt.verify(access_token, config.get("JWT_SECRET_KEY"));
  console.log(decodedData);
  req.user = await User.findById(decodedData.id);
  next();
};

//Function to authorize the access based on roles
const authorizeRole = (roles) => {
  return async(req, res, next) => {
    const roleOfUser = (await Role.find({_id : req.user.role})).name;
    if (!roles.includes(roleOfUser)) {
      throw new Unauthorized(
        `Role ${roleOfUser} is not authorized to access this resource`
      );
    }
    next();
  };
};

module.exports = {
  authMiddleware,
  authorizeRole
};
