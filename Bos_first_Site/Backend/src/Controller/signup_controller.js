const express = require("express");

const User = require("../Models/signup_model")

const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const user = await User.create(req.body)
        return res.status(201).send({message:"User Registered"})
    }
    catch(err)
    {
        return res.send({message:"Something Went Wrong"})
    }
})

router.get("",async(req,res)=>{
    try{
        const user = await User.find().lean().exec()
        return res.status(200).send(user)
    }
    catch(err)
    {
        return res.send(err)
    }
})


module.exports = router;