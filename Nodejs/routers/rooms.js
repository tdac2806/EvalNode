var express = require('express')
var router = express.Router()
var roomModel = require('../models/room')
const { checkToken } = require('../utils/token')

/* https://api.monsuperhotel.com/rooms/59bfd752z */
router.get('/:id', async (request, response) => {
   var room = await roomModel.findOne({ _id: request.params.id })
   response.json({ room })
})

/* https://api.monsuperhotel.com/rooms*/
router.get('/', async (request, response) => {
   var rooms = await roomModel.find({}) // == "SELECT * from bookings"
   response.json({ rooms })
})

/* https://api.monsuperhotel.com/rooms*/
router.post('/', checkToken, async (request, response) => {
   if (request.user.isAdmin) {
      let { body } = request
      try {
         var room = new roomModel(body)
         await room.save()
         response.status(200).send({ room })
      } catch (e) {
         response.status(409).send({ error: e.message })
      }
   }
})

/* https://api.monsuperhotel.com/rooms/59bfd752z*/
router.put('/:id', checkToken, async (request, response) => {
   if (request.user.isAdmin) {
      var room = await roomModel.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
      response.json(room)
   }
})

/* https://api.monsuperhotel.com/bookings/59bfd752z*/
router.delete('/:id', checkToken, async (request, response) => {
   if (request.user.isAdmin) {
      var room = await roomModel.findOneAndDelete({ _id: request.params.id })
      response.status(200).send()
   }
})

module.exports = router