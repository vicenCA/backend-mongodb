const jwt = require('jwt-simple');
const moment = require('moment');
const secret_key = process.env.SECRET_KEY

const createToken = function (user) {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        create_at: user.create_at,
        birthday: user.birthday,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix
    };

    return jwt.encode(payload, secret_key);
}

module.exports = {
    createToken
}