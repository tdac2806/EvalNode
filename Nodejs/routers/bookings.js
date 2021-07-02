const express = require('express')
const router = express.Router()
const bookingModel = require('../models/booking')
const { checkToken } = require('../utils/token')

/* https://api.monsuperhotel.com/bookings/59bfd752z */
router.get('/:id', checkToken, async (request, response) => {
   let params = request.user.isAdmin ? {_id: request.params.id } : { user: request.user._id }
   var booking = await bookingModel.findOne({params})
   response.json({ booking })
})

/* https://api.monsuperhotel.com/bookings*/
router.get('/', checkToken, async (request, response) => {
   let params = request.user.isAdmin ? {} : { user: request.user._id }
   var bookings = await bookingModel.find({ params }) // == "SELECT * from bookings"
   response.json({ bookings })
})

/* https://api.monsuperhotel.com/bookings*/
router.post('/', checkToken, (request, response) => {
   let data = request.body
   data.user = request.user._id
   var booking = new bookingModel(data)
   booking.save()
   response.json({ booking })
})

/* https://api.monsuperhotel.com/bookings/59bfd752z*/
router.put('/:id', checkToken, async (request, response) => {
   var booking = await bookingModel.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
   response.json(booking)

})

/* https://api.monsuperhotel.com/bookings/59bfd752z*/
router.delete('/:id', checkToken, async (request, response) => {
   var booking = await bookingModel.findOneAndDelete({ _id: request.params.id })
   response.status(200).send()
})

module.exports = router