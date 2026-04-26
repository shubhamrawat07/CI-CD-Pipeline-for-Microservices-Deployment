const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("Product Service 2 Running");
});

app.listen(3000, ()=>{
    console.log("Server running");
});
