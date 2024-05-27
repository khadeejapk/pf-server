const jwt=require('jsonwebtoken')


const jwtMiddleswareFun=(req,res,next)=>{
    console.log("Inside JwtMiddleware")
    //res.status(404).json("middle")
    // next()
    try{
        const token=req.headers.authorization.split(" ")[1]
        if(token){
            const result=jwt.verify(token,process.env.secret_key)
            console.log(result)
            req.payload=result.userId
            next()
        }
        else{
            res.status(406).json("Please Login First!!")
        }
    }
    catch{
        res.status(406).json("Please Login")
    }

}

module.exports=jwtMiddleswareFun