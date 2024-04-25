const { verifyToken } = require("../helpers/jwt")

const authentication = (req, res, next) => {
    try {
        let token = req.headers.token
        let decode = verifyToken(token)
        req.decoded = decode
        next()
    } catch (err) {
        next({message: 'You should login first!', status: 400})
    }
}

module.exports = { authentication }