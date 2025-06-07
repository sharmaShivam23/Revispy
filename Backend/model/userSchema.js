const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  Name : {
    type : String,
    required : true
  },
  Email : {
    type : String,
    required : true,
  },
  Password : {
    type : String,
    required : true
  },
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]

})

module.exports = mongoose.model("User" , userSchema)

