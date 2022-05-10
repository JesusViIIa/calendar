const jwt = require("jsonwebtoken");




const privateKey = process.env.SECRET_JWT_SEED


const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name }

        jwt.sign(payload, privateKey, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Fallo al generar el token')
            }
            resolve(token)

        })
    })

}

module.exports = {
    generateJWT
}