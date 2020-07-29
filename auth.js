const nJwt = require("njwt");

const auth = require('./auth');
const models = require('./models');
const settings = require("./settings");
const send_response = require('./send_response');

/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user ID
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
module.exports.createUserSession = (req, res, user) => {
  let claims = {
    // you can embed a comma-delimited list of scopes here that will be used for
    // authorization
    scope: "active",
    sub: user.username
  };
  let jwt = nJwt.create(claims, settings.JWT_SIGNING_KEY, settings.JWT_SIGNING_ALGORITHM);

  jwt.setExpiration(new Date().getTime() + settings.SESSION_DURATION);
  return jwt.compact();
};

/**
 * Load the user object into the request from the session data.
 *
 *  @param {Object} req  - The http request object.
 *  @param {Object} res  - The http response object.
 *  @param {Object} next - Continue processing the request.
 */
module.exports.authnticateUser = (req, res, next) => {
  // let url = req.url;
  // console.log(url);
  // if ((["/","/generate_token","/api-docs"].indexOf(url) > -1) || (url.match(/\/api-docs/g) != "")) {
  //   return next();
  // } else {
    
  // }
  token = req.headers['Authorization'] ? req.headers['Authorization'] : req.headers['authorization'];
  if (token) {
    nJwt.verify(token, settings.JWT_SIGNING_KEY, settings.JWT_SIGNING_ALGORITHM, (err, verifiedJwt) => {
      if (err) {
        console.log(err);
        console.log(err.name);
        let responseData = {
            status: false,
            msg: 'Invalid_Token',
            data: null,
            error: err.message
        };
        send_response.sendResponse(res,responseData,401);
      } else {
        req.user = verifiedJwt;
        next();
      }
      
    });
  } else {
    let responseData = {
        status: false,
        msg: 'Invalid_Token',
        data: null,
        error: ""
    };
    send_response.sendResponse(res,responseData,401);
  }
}

