const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const dbUrl = process.env.MONGO_URI ;
const Schema = mongoose.Schema;


//dbconnection
try {
    mongoose.connect(dbUrl, { useNewUrlParser: true },{ useUnifiedTopology: true })
    console.log("Database connected");
} catch (err) {
    console.log("Database not connected :",err);
}

//models
const letter = new Schema({
    name : {type : String, required : true},
    message : {type : String, required : true},
    mobile : Number,
    email : String,
    address : String,
}, timestamps)

const receiverBoxSchema = new Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    letters : [letter],
})

const receiverBox = moongoose.model("receiverBox", receiverBoxSchema)

//middlewares
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//routes

app.get("/", (req,res)=>{
    res.send("Hello server");
})

app.post("/newuser", async (req,res)=>{
    let {username, password} = req.body;
    await receiverBox.findOne({username}).then(data => {
        if(!data){
            await receiverBox.insertOne({username, password}).then(data => {
                console.log(data);
                res.json({message : "Account Created"})
            }).catch(e => {
                console.log(e);
                res.json({message : e});
            })
        }else{
            res.json({message : "Username already taken"}) 
        }
    }).catch(e => {
        res.json({message : e});
        console.log(e);
    });
    
    
})

app.post("/login", (req,res)=>{
    let {username, password} = req.body;
    await receiverBox.findOne({username, password}).then(data => {
        if(data){
            console.log(data);
            res.json(data);
        }else{
            console.log(data);
            res.json({message : "User not found"})
        }
    }).catch(e => {
        console.log(e);
        res.json({message : e})
    });
})

app.post("/postletter/:receiver", async (req,res)=>{
    let {receiver, name, message, email, mobile, address} = req.params; 
    await receiverBox.findAndUpdateOne({username : receiver}, {name, message, email, mobile, address}).save().then(data => {
        console.log(data)
        res.json({message : "Message Sent"})
    }).catch(err => {
        cosole.log(err);
        res.json({message : "Something wend wrong"})
    })

})

//listening
app.listen(port, () => {
    console.log("server is runnig at " + `${port}`)
})