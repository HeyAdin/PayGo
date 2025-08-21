const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true,
        default: 10000000
    }
});

const Account = mongoose.model('Accounts', accountSchema);
module.exports = { Account }