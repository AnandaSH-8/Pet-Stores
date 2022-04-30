const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    pet:{ type:mongoose.Schema.Types.ObjectId,ref:"pet",required:true},
    status:{type:Boolean,default:false},
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    startDate:{type:String,required:true},
    endDate:{type:String,required:true}
    },
    {
        versionKey:false,
        timestamps:true
    }

)
const booking = mongoose.model("booking",BookingSchema);

module.exports = booking;
    