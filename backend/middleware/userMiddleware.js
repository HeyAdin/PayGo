const jwt = require('jsonwebtoken');
require('dotenv').config();

function userAuth(req,res,next){
    const header = req.headers.authorization;
    if(!header || !header.startsWith('Bearer')){
        res.status(403).json({msg : "Authorization token unavailable"});
        return;
    }
    const token = header.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decoded;
        next()
    }
    catch(e){
        return res.status(411).json({msg:"invalid token"})
    }
}

module.exports = {
    userAuth
}