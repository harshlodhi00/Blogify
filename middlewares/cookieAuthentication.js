const {validateToken} = require('../services/authentication')

function checkForAuthenticationCookie (cookieName) {
    return (req ,res ,next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if(!tokenCookieValue){
            next()
        }else{
            try {
                const userPayload = validateToken(tokenCookieValue)
                req.user = userPayload; 
                next()
            } catch (error) {
                next()
            }
        }
    }
}


module.exports = checkForAuthenticationCookie;