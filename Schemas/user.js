const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrybt = require('bcrypt')
const userSchema = new Schema ({
    name:String,
    age:Number, 
    password: String ,
    phone: {type: Number, unique: true}, 
    email: {type : String , unique: true }
    
})
 //=========== to compare password when user login after it has hashed in a register opreation  
userSchema.methods.comparePasswords = async function (password){
    return await bcrybt.compare(password , this.password )
}

module.exports = mongoose.model('Users',  userSchema ) 