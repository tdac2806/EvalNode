var express = require('express')
var routerUsers = require('./routers/users')
var routerHotels = require('./routers/hotels')
var routerRooms = require('./routers/rooms')
var routerBookings = require('./routers/bookings')
var routerAuthentication = require('./routers/authentication')
var mongoose = require('mongoose')

mongoose.Promise = Promise
//user temporaire (1 semaine)
mongoose.connect('mongodb+srv://TempUser:xF9mrGLrn66anag8@cluster0.2nqci.mongodb.net/b3api?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false})

var db = mongoose.connection
db.on('error', console.error.bind(console, "connection error: "))
db.once('open', () => console.log('status :', db.states[db._readyState]))

var app = express()

app.use(express.json())

app.use('/hotels', routerHotels)
app.use('/users', routerUsers)
app.use('/rooms', routerRooms)
app.use('/bookings', routerBookings)
app.use('/login', routerAuthentication)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server is running on', 3001)
})

