const JWT = require("jsonwebtoken");

const secret = "$123Elon123$";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    userEmail: user.userEmail,
    userFullName: user.userFullName,
    profileImgURL: user.profileImgURL,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Some Problem in Authentication");
  }
}

module.exports = { createTokenForUser, validateToken };
