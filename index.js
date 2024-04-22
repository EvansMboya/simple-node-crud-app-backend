const express = require("express");
const mongoose = require("mongoose");
const app = express();
//importing routes
const productRoute=require("./routes/product.route.js")

//middlewear
//Node doesnt use json so we have to  configure it to validating 
app.use(express.json());

//validating data in a form from post man
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products",productRoute)


//req-requesting from Express res responding from Express
//testing 
app.get("/", (req, res) => {
  res.send("hello from Node API Sever");
});






//Mongo db connection
mongoose
  .connect(
    "mongodb+srv://evansmboyaem:imcwy1DTyhgOQhp9@backenddb.ktewroo.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {

    console.log("Connection to DB Successfully");

    //opens localhost port server
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });

  })
  .catch(() => {
    console.log("Connection to DB Failed!");
  });
