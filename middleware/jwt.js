const jwt = require('jsonwebtoken');
const config = require('./../config/config');

let checkToken = (req, res, next) => {
  var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer')) {
      // Remove Bearer from string
      const newToken = token.slice(7, token.length);
      jwt.verify(newToken, config.secret, function (err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid',
          });
        }
        else {
          req.decoded = decoded;
          next();
        }
      });
    }
  }
  else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}