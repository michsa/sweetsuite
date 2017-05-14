var mongoose = require('mongoose')
var Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator')
  
var userSchema = new mongoose.Schema({    
  name: {     
    first: String,   
    last: String 
  },    
  email: {type: String, required: true, index: { unique: true } },
  pw: { type: String, required: true },
  favorites: [String]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
