const { Router } = require('express');
const router = Router();
const { userAuth } = require('../middleware/userMiddleware');
const { Account ,User} = require('../db');

router.get('/balance', userAuth, async (req, res) => {
    console.log(req.userId);
    const account = await Account.findOne({ userId: req.userId.userId });
    let balance = account.balance.toString().split("");
    balance.splice(balance.length-2 , 0,'.');
    balance = balance.join("");
    balance = Number(balance);
    res.json({balance});
});

router.post('/transfer',userAuth,async(req,res)=>{
    const body = req.body;
    const currentUserAccount = await Account.findOne({userId : req.userId.userId});
    const recieverAccount = await User.findOne({_id:body.to});
    if(!recieverAccount){
        res.status(400).json({msg : "invalid account"});
        return;
    }
    if(currentUserAccount.balance<body.amount){
        res.status(400).json({msg : "insufficient balance"});
        return;
    }

    await Account.updateOne(currentUserAccount,{
        $inc:{
            balance: -body.amount
        }
    });

    await Account.updateOne(recieverAccount,{
        $inc:{
            balance: body.amount
        }
    });
    res.status(200).json({msg:"transferred"});

})

module.exports = router;