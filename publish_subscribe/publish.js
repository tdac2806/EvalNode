const redis = require('redis')
const config = {
   host: 'localhost',
   port: 6379
}

const publisher = redis.createClient(config)

publisher.publish("rayane","Bonjour")