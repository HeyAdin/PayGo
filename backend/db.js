const mongoose = require('mongoose');
const { type } = require('os');
const { number } = require('zod');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    balance :{
        type : Number,
         validate: {
        validator: function (amount) {
          return amount >= 0;
        },
        message: (props) => `${props.value} is not a positive number!`,
      },
        require : true
    } 
})


const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);
module.exports = {User,Account};