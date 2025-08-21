const { Router } = require('express');
const router = Router();
const { signUpInputValidation, signInInputValidation, updateInputValidation } = require('../types');
const { User, BlackListedToken } = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { authMiddleware } = require('../middleware');
const { Account } = require('../models/accountsModel');


router.post('/signup', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const validatedData = signUpInputValidation.safeParse(req.body);
        if (!validatedData.success) {
            const error = new Error(validatedData.error.issues[0].message);
            throw error;
        }

        const userExist = await User.findOne({ email: validatedData.data.email }).session(session);
        if (userExist) {
            const error = new Error('User already exists');
            throw error;
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(validatedData.data.password, salt);
        const user = await User.create([{
            name: validatedData.data.name,
            email: validatedData.data.email,
            password: hashPassword
        }], { session });
        const balance = await Account.create([{ userId: user[0]._id, balance: Math.floor(Math.random() * 1000000) + 10000 }], { session });
        if (!user || user.length === 0 || !balance || balance.length === 0) {
            const error = new Error('User creation failed');
            throw error;
        }
        const token = jwt.sign({ userId: user[0]._id }, secretKey, { expiresIn: '3D' });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ success: true, message: 'User signed up successfully', token: token });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: error.message });
    }
});


router.post('/signin', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payload = req.body;
        // validate the user input;
        const validatedPayload = signInInputValidation.safeParse(payload);
        if (!validatedPayload.success) {
            await session.abortTransaction();
            const error = new Error(validatedPayload.error.issues[0].message);
            throw error;
        }
        // check for user in db
        const userExist = await User.findOne({ email: validatedPayload.data.email }).session(session);
        if (!userExist) {
            const error = new Error("user doesn't exist please signup");
            throw error;
        }
        // check password 
        const hashedPassword = userExist.password;
        const comparePassword = await bcrypt.compare(validatedPayload.data.password, hashedPassword);
        if (!comparePassword) {
            const error = new Error("incorrect password");
            throw error;
        }
        // create a token 
        const token = jwt.sign({ userId: userExist._id }, secretKey, { expiresIn: '3D' })
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true, message: "user signed in successfully", token });
    }
    catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(411).json({ success: false, error: err.message });
    }
});

router.put('/update-profile', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payload = req.body;
        if (Object.keys(payload).length == 0) {
            const error = new Error("inputs are empty");
            throw error;
        }
        const validatedPayload = updateInputValidation.safeParse(payload);
        if (!validatedPayload.success) {
            const error = new Error(validatedPayload.error.issues[0].message);
            throw error;
        }
        if (validatedPayload.data.password) {
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(validatedPayload.data.password, salt);
            const updateUser = await User.findOneAndUpdate({ _id: req.userId }, {
                name: validatedPayload.data.name,
                email: validatedPayload.data.email,
                password: hashPassword
            });
            if (!updateUser) {
                const error = new Error("User updation failed");
                throw error;
            }
        } else {
            const updateUser = await User.findOneAndUpdate({ _id: req.userId }, {
                name: validatedPayload.data.name,
                email: validatedPayload.data.email
            });
            if (!updateUser) {
                const error = new Error('User updation failed');
                throw error;
            }
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({
            success: true,
            message: "user updated successfully"
        });
    }
    catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(411).json({ success: false, error: err.message });
    }

})

router.post('/signout', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (token) {
            const addToBlackList = (await BlackListedToken.create({ token })).$session(session);
            if (!addToBlackList) {
                const error = new Error('User signout failed');
                throw error;
            }
            await session.commitTransaction();
            session.endSession();
            res.status(200).json({ success: true, message: "user signed out successfull" });
            return;
        }

        const error = new Error('Something bad happened');
        throw error;
    }
    catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(411).json({ success: false, error: err.message });
    }
})


router.get('/bulk', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const filterWord = req.query.filterWord || ' ';
        const filteredUsers = await User.find({
            $or: [
                { name: { $regex: filterWord, $options: 'i' } },
                { email: { $regex: filterWord, $options: 'i' } }
            ]
        }).session(session);
        if (!filteredUsers || filteredUsers.length === 0) {
            const error = new Error('No users found');
            throw error;
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({
            success: true, users: filteredUsers.map((user) => {
                if (user._id == req.userId) {
                    return;
                }
                return { name: user.name }
            })
        });
    }
    catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(411).json({ success: false, error: err.message });
    }
})
module.exports = router;