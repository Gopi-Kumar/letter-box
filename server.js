const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const dbUrl = process.env.MONGO_URI ;
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')


//dbconnection
try {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useFindAndModify : false })
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
}, { timestamps: true })

const receiverBoxSchema = new Schema({
    username : {type : String, required : true},
    password : {type : String, required : true},
    letters : [letter],
})

const receiverBox = mongoose.model("receiverBox", receiverBoxSchema)

//middlewares
app.use(express.urlencoded());
app.use(express.json());
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

//routes

app.get("/", (req,res)=>{
    res.send("Hello server");
})

app.post("/newuser", async (req,res)=>{
    let {username, password} = req.body;
    await receiverBox.findOne({username}).then(async data => {
        if(!data){
            await new receiverBox({username, password}).save().then(data => {
                res.json({message : "Account Created"})
            }).catch(e => {
                res.json({message : e});
            })
        }else{
            res.json({message : "Username already taken"}) 
        }
    }).catch(e => {
        res.json({message : e});
    });
    
    
})

app.post("/login",async (req,res)=>{
    let {username, password} = req.body;
    await receiverBox.findOne({username, password}).then( data => {
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
    let {receiver} = req.params; 
    let {name, message, email, mobile, address} = req.body; 
    // return res.send(req.body)
    console.log(typeof(req.body))
    await receiverBox.findOneAndUpdate({username : receiver}, {$push : {letters : {name : name, message : message, email : email,mobile : mobile,address : address}}},{ upsert: true, new: true }).then(data => {
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