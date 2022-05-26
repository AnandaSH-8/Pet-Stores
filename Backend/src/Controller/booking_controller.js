const express = require("express");

const Booking = require("../Models/booking")

const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const booking = await Booking.create(req.body)
        return res.status(201).send({message:"Successfully Added"})
    }
    catch(err)
    {
        return res.send({error:err,message:"Something Went Wrong"})
    }
})

router.get("",async(req,res)=>{

    try{
        const booking = await Booking.find()
        .populate({ path: "owner", select: ["name","phone","email"] })
        .populate({ path: "pet", select: ["type","weight","image"] }).lean().exec()
        return res.status(200).send(booking)
    }
    catch(err) 
    {
        return res.send(err)
    }
})

router.get("/owner/:id",async(req,res)=>{

    try{
        const booking = await Booking.find({owner:req.params.id})
        .populate({ path: "owner", select: ["name","phone","email"] })
        .populate({ path: "pet", select: ["type","weight","image"] }).lean().exec()
        return res.status(200).send(booking)
    }
    catch(err) 
    {
        return res.send(err)
    }
})


router.put("/:id",async(req,res)=>{
    
    try{
        const booking = await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).send({message:"Updated",booking})
    }
    catch(err)
    {
        return res.send({message:"Something went wrong"})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const booking = await Booking.findByIdAndDelete(req.params.id);
        return res.status(200).send({message:"Deleted"})
    }
    catch(err)
    {
        return res.send({message:"Couldn't Delete"})
    }
})



module.exports = router;