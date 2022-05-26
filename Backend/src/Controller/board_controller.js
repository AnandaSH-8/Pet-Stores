const express = require("express");

const Board = require("../Models/board_model")

const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const site = await Board.create(req.body)
        return res.status(201).send({message:"Successfully Added"})
    }
    catch(err)
    {
        return res.send({error:err,message:"Something Went Wrong"})
    }
})

router.get("",async(req,res)=>{
    
    const page = req.query.page || 1;
    const size = req.query.size || 5;
    const rating = req.query.rating || 1
    const verified = req.query.verified || [true,false] // filter
    const cost = req.query.cost || -1;
    const city = req.query.city

    try{
        if(city == 0)
        {
            const site = await Board.find({verified}).sort({"rating":rating,"costPerDay":cost})
            .skip((page-1)*size).limit(size)
            .lean().exec()

            const count = await Board.find({verified}).countDocuments()
            return res.status(200).send({site,count})
        }
        else
        {   
            const site = await Board.find({city,verified}).sort({"rating":rating,"costPerDay":cost})
            .skip((page-1)*size).limit(size)
            .lean().exec()

            const count = await Board.find({city,verified}).countDocuments()
            return res.status(200).send({site,count})

        }
    }
    catch(err)
    {
        return res.send(err)
    }
})

router.get("/search",async(req,res)=>{
    let key = req.query.search
    try{
        const board = await Board.find({$or:[{city:{$regex:key}}]}).lean().exec();
        console.log(board)
        return res.send(board);
    }
    catch(err){
        return res.send(err);
    }
})


router.get("/:id",async(req,res)=>{
    try{
        const board = await Board.findById(req.params.id).lean().exec();
        return res.send(board);
    }
    catch(err){
        return res.send(err);
    }
})

router.put("/:id",async(req,res)=>{
    
    try{
        const site = await Board.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).send({message:"Updated",site})
    }
    catch(err)
    {
        return res.send({message:"Something went wrong"})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const site = await Board.findByIdAndDelete(req.params.id);
        return res.status(200).send({message:"Deleted"})
    }
    catch(err)
    {
        return res.send({message:"Couldn't Delete"})
    }
})



module.exports = router;