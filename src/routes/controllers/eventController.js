const { request } = require("express");
const { isValidObjectId } = require("mongoose");
const Event = require("../../models/Event");

const getEvents = async(req, res) => {
    const events = await Event.find().populate('user', 'name')
    res.status(200).send({ ok: true, events });
}

const createEvent = async(req, res) => {
    const event = new Event(req.body)
    event.user = req.uid
    try {
        const savedEvent = await event.save()

        res.status(201).send({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Algo salió mal..' });
    }


}
const updateEvent = async(req = request, res) => {
    const { id: eId } = req.params
    if (!isValidObjectId(eId)) return res.status(404).send({ ok: false, msg: 'ID invalido' })


    try {
        const event = await Event.findById(eId)
        if (!event) {
            return res.status(404).send({ ok: false, msg: 'No existe evento con ese id' })
        }
        if (event.user.toString() !== req.uid) {
            return res.status(401).send({ ok: false, msg: 'No autorizado' })
        }
        const newEvent = {...req.body, user: req.uid }
        const updatedEvent = await Event.findByIdAndUpdate(eId, newEvent, { new: true })
        res.send({ ok: true, event: updatedEvent });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Algo salió mal..' });
    }

}




const deleteEvent = async(req, res) => {
    const { id: eId } = req.params
    if (!isValidObjectId(eId)) return res.status(404).send({ ok: false, msg: 'ID invalido' })

    try {
        const event = await Event.findById(eId)
        if (!event) {
            return res.status(404).send({ ok: false, msg: 'No existe evento con ese id' })
        }
        if (event.user.toString() !== req.uid) {
            return res.status(401).send({ ok: false, msg: 'No autorizado' })
        }
        await Event.findByIdAndDelete(eId)
        res.send({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Algo salió mal..' });
    }

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}