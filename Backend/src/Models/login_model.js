const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String ,required:true},},
    {
        versionKey:false,
        timestamps:true
    }
)

LoginSchema.pre("save", function (next) { // signup

    let hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

const UserLogin = mongoose.model("login",LoginSchema)

module.exports = UserLogin