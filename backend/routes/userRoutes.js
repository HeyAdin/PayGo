const { Router } = require('express');
const router = Router();
const { User, Account } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const zod = require('zod');
const { signUpSchema, signInSchema, updateProfile } = require('../inputsVal');
const { userAuth } = require('../middleware/userMiddleware');
async function userExists(email) {
    const user = await User.findOne({ email });
    if (!user) {
        return false
    }
    return true;
}

router.post('/signup', async (req, res) => {
    const unEncryptedBody = req.body;
    const userInput = signUpSchema.safeParse(unEncryptedBody);
    if (userInput.success) {
        const hashPassword = await bcrypt.hash(unEncryptedBody.password, 12);
        if (await userExists(unEncryptedBody.email)) {
            res.status(411).json({ msg: "user already exist" });
            return;
        }
        unEncryptedBody["password"] = hashPassword;
        const encryptedBody = unEncryptedBody;
        const user = new User(encryptedBody);
        const accounts = new Account({
            userId:user._id,
            balance : Math.floor(1+Math.random()*10000)*100,
        })
        await user.save();
        await accounts.save();
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET);
        res.status(200).json({ msg: 'signup successful',token });
        return;
    }
    res.status(411).json({ msg: "invalid inputs" });
});

router.post('/signin', async (req, res) => {
    const body = req.body;
    const userInput = signInSchema.safeParse(body);
    if (userInput.success) {
        if (!await userExists(body.email)) {
            res.status(411).json({ msg: "user doesn't exists" });
            return;
        }
        const user = await User.findOne({ email: body.email });
        const checkPassword = bcrypt.compare(body.password, user.password);
        if (checkPassword) {
            const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET);
            res.status(200).json({ msg: "sign in successful", token });
            return;
        }
        res.status(401).json({ msg: "Wrong password" });
        return;
    }
    res.status(411).json({ msg: "invalid inputs" });
});

router.put('/update-profile', userAuth, async (req, res) => {
    const body = req.body;
    if (body.password) {
        const hashPassword = await bcrypt.hash(body.password, 12);
        body.password = hashPassword
    }
    if(Object.keys(body).length === 0){
        res.status(403).json({msg:"no inputs"});
        return;
    }
    const response = updateProfile.safeParse(body);
    if (response.success) {
        await User.findOneAndUpdate({ _id: req.userId }, body);
        res.status(200).json({ msg: "profile updated" });
        return;
    }
    res.status(411).json({ msg: "invalid inputs" });
})

router.get('/bulk',userAuth,async(req,res)=>{
    const filterWord = req.query.filter || "";
    const users = await User.find({
        $or:[{firstName : {$regex : filterWord}},{lastName : {$regex : filterWord}},{email : {$regex : filterWord}}]
    })
    if(users.length == 0){
        res.json({msg :"user not found"});
        return;
    }

    let filteredUser = users.map((user)=>{
        return {firstName :user.firstName , lastName : user.lastName , id:user._id}
    }) 
    res.json({msg:filteredUser});
})
router.get('my-profile',userAuth,async(req,res)=>{
    const myProfile = await User.findOne({_id:req.userId});
    if(!myProfile){
        res.status(400).json({msg:"user not found"});
        return;
    }
    res.status(200).json({firstName : myProfile.firstName})
})

router.get('all-user',userAuth,async(req,res)=>{
    const allUser = await User.find();
    if(!allUser){
        res.status(404).json({msg:"no users found"});
    }
    const friends = allUser.filter((user)=>{
        if(user._id == req.userId){
            return false
        }
        return true;
    })
    res.status(200).json({friends});
})
module.exports = router