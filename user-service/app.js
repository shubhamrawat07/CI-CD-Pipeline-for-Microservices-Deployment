const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("User Service Running 20th edition");
});

app.listen(3000, ()=>{
    console.log("Server running");
});
