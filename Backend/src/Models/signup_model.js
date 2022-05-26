const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    type:{type:String,default:"user"},
    password:{type:String ,required:true},},
    {
        versionKey:false,
        timestamps:true
    })

userSchema.pre("save", function (next) { // signup
    if (!this.isModified("password")) return next();

    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user",userSchema)

module.exports = User