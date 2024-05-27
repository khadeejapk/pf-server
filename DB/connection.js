const mongoose=require("mongoose")
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb atles connection successfull!!!");
}).catch((err)=>{
      console.log("Mongodb connection failed");
      console.log(err);
})

