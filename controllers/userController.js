const User = require("../models/userModel");
const Role = require("../models/roleModel");
const { StatusCodes } = require("http-status-codes");
const sendToken = require("../utils/sendToken");
const {
  BadRequest,
  Unauthorized,
  NotFound,
  CustomAPIError,
} = require("../errors");

//SignInUser helps an existing user to signin
const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest(`Please enter the email and password`);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Invalid email or password`);
  }
  const checkPassword = await user.isPasswordCorrect(password);
  if (!checkPassword) {
    throw new Unauthorized(`Invalid email or passwords`);
  }

  sendToken(user, StatusCodes.OK, res);
}

//SignUpUser helps add a new user
const signUpUser = async (req, res) => {
  console.log("/signUp");
  try {
    const { email, name, password, role } = req.body;

    //Makes a user in the database
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    //Generates token for the created user
    sendToken(user, StatusCodes.CREATED, res);

  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      content: {
        error: error.message
      }
    });
  }
  //Takes email, name and password from the request body

}


const deleteUser = async (req, res) => {
  try {
    const id = req.body.id;
    User.deleteOne({
      id: id
    })
      .then((response) => {
        res.status(StatusCodes.OK).json({
          status: true,
          content: {
            data: response
          }
        });
      })
      .catch((error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          content: {
            error: error.message,
          }
        });
      });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      content: {
        error: error.message,
      }
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const outputJson = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    User.findOneAndUpdate(
      { id: id },
      { $set: outputJson },
      { new: false }
    )
      .then((response) => {
        res.status(StatusCodes.OK).json({
          status: true,
          content: {
            data: outputJson,
          }
        });
      })
      .catch((error) => {
        console.log("inner ", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          content: {
            error: error,
          }
        });
      });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      content: {
        error: error.message,
      }
    });
  }
}

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    User.find({
      _id: id
    })
      .then((response) => {
        res.status(StatusCodes.OK).json({
          status: true,
          content: {
            data: response,
          }
        });
      })
      .catch((error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          content: {
            error: error.message,
          }
        });
      });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      content: {
        error: error.message,
      }
    });
  }
}

const getAllUsers = async (req, res) => {
  try {
    User.find({})
      .populate('role')
      .then((response) => {
        res.status(StatusCodes.OK).json({
          status: true,
          content: {
            data: response
          }
        });
      })
      .catch((error) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          status: false,
          content: {
            error: error.message,
          }
        });
      });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      content: {
        error: error.message,
      }
    });
  }
}
//exports
module.exports = {
  signInUser,
  signUpUser,
  deleteUser,
  updateUser,
  getById,
  getAllUsers,
}