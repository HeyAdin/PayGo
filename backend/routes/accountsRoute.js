const { Router } = require('express');
const router = Router();
const { userAuth } = require('../middleware/userMiddleware');
const { Account, User } = require('../db');
const { default: mongoose } = require('mongoose');

router.get('/balance', userAuth, async (req, res) => {
    console.log(req.userId);
    const account = await Account.findOne({ userId: req.userId });
    let balance = account.balance.toString().split("");
    balance.splice(balance.length - 2, 0, '.');
    balance = balance.join("");
    balance = Number(balance);
    res.json({ balance });
});

router.post('/transfer', userAuth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const body = req.body;
    const currentUserAccount = await Account.findOne({ userId: req.userId }).session(session);
    const recieverAccount = await User.findOne({ _id: body.to }).session(session);
    console.log(recieverAccount);
    if (!recieverAccount) {
        await session.abortTransaction()
        res.status(400).json({ msg: "invalid account" });
        return;
    }
    if (currentUserAccount.balance < body.amount) {
        await session.abortTransaction();
        res.status(400).json({ msg: "insufficient balance" });
        return;
    }

    const fromAccount = await Account.updateOne({userId : req.userId}, {
        $inc: {
            balance: -body.amount * 100
        }
    }).session(session);

    console.log(fromAccount);

    const toAccount = await Account.updateOne({userId : body.to}, {
        $inc: {
            balance: body.amount * 100
        }
    }).session(session);

    console.log(toAccount)
    await session.commitTransaction();
    res.status(200).json({ msg: "transferred" });

})

module.exports = router;