const { response } = require("express");
const jwt = require("jsonwebtoken");

const privateKey = process.env.SECRET_JWT_SEED
const validateJwt = (req, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).send({
            ok: false,
            msg: 'No hay token '
        })
    }
    try {
        const payload = jwt.verify(token, privateKey)
        req.uid = payload.uid
        req.name = payload.name

    } catch (error) {
        return res.status(401).send({
            ok: false,
            msg: 'No hay token valido'
        })
    }
    next()
}

module.exports = validateJwt