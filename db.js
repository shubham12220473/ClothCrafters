const moongosh=require("mongoose");
const db="mongodb+srv://deepsingla022:lalit000@cluster0.a0nq49n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
moongosh.connect(db)
.then(()=>console.log("Connected"))
.catch(e=>console.log(e));
const Schema=new moongosh.Schema({
    name:String,
    email:String,
    password:String
});
const CLients=moongosh.model("Clients",Schema);