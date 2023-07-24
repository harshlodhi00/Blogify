const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      console.log(userPayload);
      req.user = userPayload;
    } catch (error) {
      return next();
    }
    return next();
  };
}

module.exports = checkForAuthenticationCookie;
