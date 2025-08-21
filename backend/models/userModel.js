const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 50,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const blacklistedTokenSchema = new mongoose.Schema({
  token : {
    type : String,
    required : true,
    unique : true
  },
  createdAt : {
    type : Date,
    default : Date.now,
    expires : '3d'
  }
})

const User = mongoose.model("User", userSchema);
const BlackListedToken = mongoose.model('BlacklistedToken',blacklistedTokenSchema);

module.exports = { User , BlackListedToken };