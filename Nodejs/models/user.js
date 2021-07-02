const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   firstname: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   isAdmin: {
      type: Boolean,
      required: false
   }
})


userSchema.pre('save', async function (next) {
   let user = await userModel.findOne({ email: this.email })
   if (user)
      next(new Error("email already used"));
   else
      next();
});


var userModel = mongoose.model('user', userSchema)

module.exports = userModel

