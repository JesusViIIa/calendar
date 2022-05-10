const express = require("express");
const { check } = require("express-validator");
const fieldValidator = require("../middlewares/fieldValidator");
const validateJwt = require("../middlewares/validateJwt");
const {
    login,
    createUser,
    renewToken,
} = require("./controllers/authController");
const router = express.Router();


router.post("/", [
        check("email", "Formato de correo invalido").isEmail(),
        check("password", "Contraseña muy corta").isLength({ min: 6 }),
        fieldValidator
    ],
    login
);

router.post("/new", [
        //midlewares
        check("name", "El nombre es obligatorio").notEmpty(),
        check("email", "Formato de correo invalido").isEmail(),
        check("password", "Contraseña muy corta").isLength({ min: 6 }),
        fieldValidator
    ],
    createUser
);

router.get("/renew", validateJwt, renewToken);

module.exports = router;