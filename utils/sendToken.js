const _ = require('lodash');
const config = require('config');

const sendToken = (user, statusCode, res) => {
  try {
    const access_token = user.createJWT();

    //options for cookies
    const cookieLifetime = config.get("COOKIE_LIFETIME");
    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + cookieLifetime * 24 * 60 * 60 * 1000
      ),
    };
    const data = _.omit(user.toObject(), 'password');

    //creates a cookie
    res.status(statusCode).cookie("access_token", access_token, options).json({
      status: true,
      content: {
        data: data,
        meta: {
          access_token: access_token
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendToken;
