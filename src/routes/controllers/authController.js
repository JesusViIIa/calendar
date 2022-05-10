const bcrypt = require("bcryptjs/dist/bcrypt")
const { response } = require("express")
const { generateJWT } = require("../../helpers/jwt/jwt")
const User = require("../../models/User")



const login = async(req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({
                ok: false,
                msg: 'El usuario no existe'
            })
        }
        //chech passwprd
        const validPass = bcrypt.compareSync(password, user.password)
        if (!validPass) {
            return res.status(400).send({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }
        //jwt
        const token = await generateJWT(user.id, user.name)
        res.status(200).send({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            msg: error.errors
        })

    }
}

const createUser = async(req, res) => {
    const { name, email, password } = req.body


    try {

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).send({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }

        user = new User({ name, email, password })


        //encrypt pass
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        const savedUser = await user.save()
            //jwt
        const token = await generateJWT(user.id, user.name)
        res.status(201).send({
            ok: true,
            uid: savedUser.id,
            name: savedUser.name,
            token
        })
    } catch (error) {
        return res.status(400).send({
            ok: false,
            msg: error.errors
        })

    }

}

const renewToken = async(req, res = response) => {

    const { uid, name } = req
    const token = await generateJWT(uid, name)

    res.send({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    login,
    renewToken
}