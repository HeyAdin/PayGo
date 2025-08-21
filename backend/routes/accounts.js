const { Router, response } = require('express');
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose');
const { Account } = require('../models/accountsModel');
const { fundTransferInputValidation } = require('../types');
const { User } = require('../models/userModel');
const router = Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const response = await Account.findOne({ userId: req.userId }).session(session)
        if (!res) {
            const error = new Error("error while fetching balance");
            throw error;
        }
        const balance = "Rs." + (response.balance / 100).toFixed(2);
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true, message: "balance fetching successful", balance })
    }
    catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: error.message });
    }
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payload = req.body;
        const validatePayload = fundTransferInputValidation.safeParse(payload);
        if (!validatePayload.success) {
            const error = new Error(validatePayload.error.issues[0].message);
            throw error;
        }

        const tranferFromAccount = await Account.findOneAndUpdate({ userId: req.userId, balance: { $gte: validatePayload.data.amount } }, { $inc: { balance: -validatePayload.data.amount } }, { new: true }).session(session);
        const tranferToAccount = await Account.findOneAndUpdate({ userId: validatePayload.data.toUserId }, { $inc: { balance: validatePayload.data.amount } }, { new: true }).session(session);
        if (!tranferFromAccount) {
            const error = new Error("insufficient balance");
            throw error;
        }
        if (!tranferToAccount) {
            const error = new Error("invalid account");
            throw error;
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true, message: "funds transfer successfull" });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(404).json({success : false , message:error.message});
    }
})

module.exports = router;