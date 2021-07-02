const redis = require('redis')
const config = {
   host: 'localhost',
   port: 6379
}

const subscriber = redis.createClient(config)

subscriber.on("message", (channel, message) => {
   console.log(channel,message)
})

subscriber.subscribe('rayane')