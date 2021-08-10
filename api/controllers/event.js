const Event = require('../models/Event')
const errorHandler = require('../utilits/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const event = await Event.find()
    res.status(200).json(event)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const event = new Event({
    title: req.body.title,
    start: new Date(Date.parse(req.body.start)),
    end: new Date(Date.parse(req.body.end))
  })
  try {
    await event.save()
    res.status(201).json(event)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function (req, res) {
  const updated = {
    title: req.body.title
  }
  try {
    const event = await Event.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(event)
  } catch (e) {
    errorHandler(res, e)
  }
}
