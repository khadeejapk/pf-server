
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')


exports.userRegister=async (req,res)=>{
    const {username,password,email}=req.body 
    // console.log(username,password,email);
    console.log(" Inside Register Function!!!");

    try{

        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(401).json("User already Exist")
        }else{
            const newUser=new users({
                username,password,email,profile:"",github:"",linkdin:""
            })
            await newUser.save()
            res.status(201).json(newUser)
    
        }

    }catch(err){
        res.status(404).json(err)
    }

}

exports.userLogin = async (req,res) =>{
    const {email, password }=req.body
    try{
        const existingUser = await users.findOne({ email, password})
        console.log(existingUser);
        if(existingUser){
            const token=jwt.sign({email:existingUser.email,username:existingUser.username,userId:existingUser._id},process.env.secret_key)
            const rest={token,user:existingUser.username,userDetails:existingUser}
            console.log(token);
            res.status(200).json(rest)
        }
        else{
            res.status(406).json("Invalid Username/Password")
        }
    }
    catch(err){
        console.log(err);
        res.status(401).json(err)
    }
}

exports.userUpdateProfile = async (req,res) =>{
    const userId = req.payload
    const { username, password, email, github, linkdin, profile}=req.body
    const profileImage = req.file ? req.file.filename : profile
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId },{username,password,email,github,linkdin,profile:profileImage},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch{
        console.log(err);
        res.status(406).json(err)
    }
}

