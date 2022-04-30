const express = require("express");

const Pet = require("../Models/pet_model")

const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const pet = await Pet.create(req.body);
        res.send({message:"Pet added Successfully"});
    }catch(err){
        console.log({message:"Failed To Add"});
    }
})

router.get("",async(req,res)=>{
    try{
        const pet = await Pet.find()
        .populate({ path: "owner", select: ["name","email"] })
        .lean().exec();
        return res.send(pet);
    }
    catch(err){
        return res.send(err);
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const pet = await Pet.findById(req.params.id)
        .populate({ path: "owner", select: ["name","email"] }).lean().exec();
        return res.send(pet);
    }
    catch(err){
        return res.send(err);
    }
})

router.get("/store/:id",async(req,res)=>{

    try{
        const pet = await Pet.find({store:req.params.id}).lean().exec()
        return res.send(pet);
    }
    catch(err){
        return res.send(err);
    }
})

router.get("/owner/:id",async(req,res)=>{

    try{
        const pet = await Pet.find({owner:req.params.id})
        .populate({ path: "owner", select: ["name","email"] }).lean().exec()
        return res.send(pet);
    }
    catch(err){
        return res.send(err);
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const pet = await Pet.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).send({message:"Updated"})
    }
    catch(err){
        return res.send({message:"Failed Update"});
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const pet = await Pet.findByIdAndDelete(req.params.id);
       return res.send({message:"Pet detail Deleted"});
    }
    catch(err){
        return res.send({message:"Could not deleted"});
    }
})

module.exports = router;