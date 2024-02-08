// logic to register
//  import userschema
const { response } = require("express");
const users= require("../Models/userSchema")
const jwt = require("jsonwebtoken")


exports.register =async (req,res)=>{
    console.log("inside usercontroller:register method");
    const {username,email,password}=req.body;
    console.log(username,email,password);
    try{
    // check whether emailid is already exist in under collection
    const existingUser = await users.findOne({email:email});
    console.log(existingUser);
     if(existingUser){
        // if user already registered by checking email
        res.status(406).json('Accont already exist,please Login')

     }
     else{
        const newUser = new users({
            username:username,
            email:email,
            password:password,
            github:"",
            linkedin:"",
            profile:""
        })

        await newUser.save();
        res.status(200).json(newUser)
     }


}catch(err){
    res.status(401).json("registration request failed due to ",err)
}
    // // for testing a samplle response is confiqured
    // res.status(200).json("register request recived")
}


exports.login = async(req,res)=>{
    console.log("inside login controller method");
    const{email,password}=req.body;
    try{
        const existingUser =await users.findOne({email:email,password:password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"superscretkey12345");
            console.log(token);
            res.status(200).json({
                existingUser:existingUser,
                token:token
            })
        }
        else{
            res.status(406).json("invalid emailId or password")
        }

    }
    catch(err){
        res.status(401).json("login request failed due to error",err)
    }
}

