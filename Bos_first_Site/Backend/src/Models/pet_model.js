const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    type:{type:String,required:true},
    weight:{type:Number,required:true},
    image:{type:String,required:true},
    booked:{type:Boolean,default:false},
    store:{
        type:mongoose.Schema.Types.ObjectId,ref:"board"},
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"}
    },
    {
        versionKey:false,
        timestamps:true
    }
)
const Pet = mongoose.model("pet",petSchema);

module.exports = Pet;
    