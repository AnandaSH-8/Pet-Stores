const express = require("express");
require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../Models/signup_model")
const UserLogin = require("../Models/login_model")

const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        
        if(user)
        {
            const match = user.checkPassword(req.body.password);

            if(match)
            {
                const loger = await UserLogin.create(req.body)
                var token = jwt.sign({ user }, process.env.JWT);
                return res.status(201).send(
                    {type:user.type,token,message:"Login SuccessFull"})
            }
            else
            {
                return res.status(400).send({message:"Incorrect Details"})
            }   
        }
        else
        {
            return res.status(400).send({message:"User Not Reqistered"})
        }
    }
    catch(err)
    {
        return res.send(err)
    }
})

router.get("",async(req,res)=>{
    try{
        const user = await UserLogin.find().lean().exec()
        return res.status(200).send(user)
    }
    catch(err)
    {
        return res.send(err)
    }
})


module.exports = router;