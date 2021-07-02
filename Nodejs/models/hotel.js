var mongoose = require('mongoose')
const roomModel = require('./room')

var hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    furnitures:{
        type: Array, 
        required: true
    },
    location:{
        type: Object,
        required: true
    }
})

hotelSchema.post('findOneAndDelete', async function (document) {
   let room = await roomModel.deleteMany({hotel:document._id});
 });

 hotelSchema.pre('save', async function (next) {
   next()
})

var hotelModel = mongoose.model('hotel', hotelSchema)

module.exports = hotelModel

