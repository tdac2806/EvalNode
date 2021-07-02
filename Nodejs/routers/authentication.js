const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const {createToken} = require('../utils/token')

router.get('/:id', async(request, response) => {
   var user = await userModel.findOne({_id:request.params.id})
   response.json({user})
})
router.post('/:id',async(request,response)=> {
   let user  = await userModel.findOne({_id:request.params.id})
   if(user.password === request.body.password){
      const token = createToken(user)
      response.status(200).send({token})
   }else{
      response.status(409).send({error : "user not found"})
   }
})

module.exports = router