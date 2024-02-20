const { allowedOrigins } = require("../config/corsOptions");

// Allows to access cookie if the request is from any of the allowed origins
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
