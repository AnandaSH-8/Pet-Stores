const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true},
    capacity:{type:Number,required:true},
    costPerDay:{type:Number,required:true},
    verified:{type:Boolean,required:true},
    rating:{type:Number,required:true},
    details:{
        summary:{type:String,required:true},
        pets:{type:Number,required:true},
        types:[{type:String,required:true}],
        size:{type:String,required:true},
        supervision:{type:String,required:true},
        place:{type:String,required:true},
        sleep:{type:String,required:true}, 
        breaks:{type:String,required:true}, 
        walks: {type:Number,required:true},
        stay:{type:String,required:true},
        areaSize: {type:String,required:true},
        emergency:{type:String,required:true},
        },
    },
    {
        versionKey:false,
        timestamps:true
    })

const Board = mongoose.model("board",BoardSchema)

module.exports = Board
