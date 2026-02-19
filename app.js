const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./Routeres/users')


const app = express()
app.use(bodyParser.json())

const uri = "mongodb+srv://madboly:rVvns8vPv9KRxH38@medo.mhymn.mongodb.net/?retryWrites=true&w=majority&appName=medo";
const connectToDB = async ()=>{
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(uri)
        console.log("Connected to Database" )

    } catch (erorr){
        console.log("connect to db erorr:", erorr)
        process.exit()
    }
}


connectToDB()

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


app.use('/', userRouter)

app.listen(9060)