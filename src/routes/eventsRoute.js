const express = require("express");
const router = express.Router();
const { check } = require("express-validator");


const { isDate } = require("../helpers/isDate");
const fieldValidator = require("../middlewares/fieldValidator");
const validateJwt = require("../middlewares/validateJwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("./controllers/eventController");


router.use(validateJwt)


router.get("/", getEvents);
router.post('/', [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de fin obligatoria').custom(isDate),
    fieldValidator
], createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);


module.exports = router