const express=require("express");
const moongosh=require("mongoose");
const fs=require("node:fs/promises");
const db="mongodb+srv://deepsingla022:lalit000@cluster0.a0nq49n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
moongosh.connect(db)
.then(()=>console.log("Connected"))
.catch(e=>console.log(e));
const Schema=new moongosh.Schema({
    name:String,
    email:String,
    password:String
});
const Clients=moongosh.model("Client",Schema);
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.post("/signin",(req,res)=>{
    const {name,email,password}=req.body;
    Clients.find({
        email:email
    }).then(async(u)=>{
        // console.log(u.length);
        if(u.length!=0){
            const read=await fs.open("used.html","r");
            const st=read.createReadStream();
            st.pipe(res);
        }
        else{
            const user=new Clients({
                name:name,
                email:email,
                password:password
            });
            user.save().
            then(async(user)=>{
                const read=await fs.open("web.html","r");
                const st=read.createReadStream();
                st.pipe(res);
            });
        }
    })
});
app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    Clients.find({
        email:email,
        password:password
    }).then(async(user)=>{
        if(user.length!=0){
            const read=await fs.open("web.html","r");
            const st=read.createReadStream();
            st.pipe(res);
        }
        else{
            const read=await fs.open("unautho.html","r");
            const st=read.createReadStream();
            st.pipe(res);
        }
    })
})
app.listen(5202);
