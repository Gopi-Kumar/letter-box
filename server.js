const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.port || 3000;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Hello server");
})

app.post("/:username/:password/postletter", (req,res)=>{
    res.send("Hello server");
})

app.get("/getletter", (req,res)=>{
    res.send("Hello server");
})


app.listen(port, ()=>{
    console.log("server is runnig at " + `${port}`)
})