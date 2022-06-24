const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./Models/users')

mongoose.connect('mongodb://localhost/userData')
const con =  mongoose.connection

app.use(express.json())
app.use(cors())

app.post("/register", async (req, res) => {
    
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.status(200).json({success : true, message : "successfully stored the data"})
    }catch(err){
        res.status(200).json({success : false, message : "same user found"})
        console.log(err)
    }
    
})

app.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if (user){
            const token = jwt.sign({
                email : user.email,
                name: user.name 
            }, 'secret123')

            res.status(200).json({success : true, message : "successfully found the user", token : token})
        }
        else{
            res.status(200).json({success : flase, message : "No user found"})
        }
    }catch(err){
        res.status(200).json({success : false, message : "error while authenticating"})
    }
    
})


app.listen(5000, ()=>{
    console.log("Server started listening on port 5000");
})