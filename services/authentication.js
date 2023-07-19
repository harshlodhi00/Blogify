const JWT = require("jsonwebtoken");


const secret = "$123Elon123$";


function createTokenForUser(user){
    const payload = {
        _id : user._id,
        userEmail : user.userEmail,
        userFullName : user.userFullName,
        profileImgURL : user.profileImgURL
    }
    const token = JWT.sign(payload, secret);
    return token;
}


function validateToken(token){
    const payload = JWT.verify(token)
    return payload;
}


module.exports = {createTokenForUser, validateToken};