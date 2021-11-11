const jwt = require('jwt-simple');
const moment = require('moment');
const secret_key = process.env.SECRET_KEY

const ensureAuth = async (req, res, next) => {
    /* Si no llega header authorization mandar un status 403*/
    if (!req.headers.authorization) {
        return res.status(403).send({message: "Request hasn't the authorization header"});
    }
    /* replace función de js para sacar las comillas simple y doble, más todas las que estén en el string. */
    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        const payload = jwt.decode(token, secret_key);
        
        if(payload.exp <= moment().unix()) {
            return res.status(401).send({message: "Token has expired"});
        }
        else {
            req.user = payload;
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({message: "Token is not valid"});
    }

    
    /* Para salir del middleware */
    next();

};

module.exports = {
    ensureAuth
}