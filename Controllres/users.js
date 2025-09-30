

const userModel = require ('../Schemas/user')
const bcrypt = require('bcrypt') // to hash user password //bcrypt
const jwt = require ('jsonwebtoken')



//================= this a register to desler a new user in web site 



exports.register = async function(req, res){
   try{
       let newUser = new userModel(req.body)
       // hash password
       const hashedPassword = await bcrypt.hash(req.body.password, 10)
       newUser.password = hashedPassword
       let createdUser = await newUser.save()
       res.json({message: 'User created successfully', createdUser})

   }catch (error){
    res.status(400).send({message: 'Error registering user'})
   }
}

 
//  ==================          this is a login  


exports.login = async function(req, res){
   try{
        let user = await userModel.findOne({email: req.body.email})
        if (!user){
         res.status(401).json({message: 'infalid email or password'})
        }
        let passwordCheck = await user.comparePasswords(req.body.password)
        if ( passwordCheck === false ){
         res.status(401).json({message: 'infalid email or password'})
        }
        const token = jwt.sign({_id  :user._id , name: user.name} , 'secret')
         res.status(200).json({message:"user loged in" , user: {name:user.name , email:user.email , token}})
   }
    catch (error){
    res.status(400).json({message: 'Error user name or password'})
   }

}