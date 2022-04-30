const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

require("dotenv").config()
const signupController = require("./Controller/signup_controller")
const loginController = require("./Controller/login_controller")
const authToken = require("./Controller/auth_controller")
const BoardController = require("./Controller/board_controller")
const PetController = require("./Controller/pet_Controller")
const BookingController = require("./Controller/booking_controller")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/register",signupController)
app.use("/login",loginController)
app.use("/home",authToken)
app.use("/boards",BoardController)
app.use("/pets",PetController)
app.use("/bookings",BookingController)

const port = process.env.PORT || 3000
const db = process.env.DB

app.listen(port,async(req,res)=>{

    try{
        await mongoose.connect(db)
        console.log("Connected Port",port)
    }
    catch(err)
    {
        console.error(err,"Failed to Connect to DB")
    }
})