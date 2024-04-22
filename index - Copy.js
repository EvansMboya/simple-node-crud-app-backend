const express = require("express");
const mongoose = require("mongoose");
//importing model
const Product=require("./models/product.model.js");
const app = express();

//middlewear
//Node doesnt use json so we have to configure it to accept
app.use(express.json());

//passing data in a form
app.use(express.urlencoded({extended: false}));

//routes
app.use("api/products",productRoute)


//req-requesting from Express res responding from Express
app.get("/", (req, res) => {
  res.send("hello from Node API Sever");
});

// Read using the product model to read data

app.get("/api/products", async (req,res)=>{


    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message:error.message});
    }


})

//read using the id
app.get("/api/products/:id",async (req,res)=>{

    try{

      const{id}=req.params;
      const product=await Product.findById(id);
      res.status(200).json(product);

    }catch(error){
      res.status(500).json({message:error.message});
    }

})


// Create using the product model to create data
app.post("/api/products",async(req,res)=>{
    
    //testing
    //console.log(req.body);
    //res.send(req.body);

    try {
       const product = await Product.create(req.body);
       res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }


})

//edit using the product model to edit data
app.put("/api/products/:id",async (req,res)=>{

///updating the db
  try {

    const {id} =req.params;
    const product=await Product.findByIdAndUpdate(id, req.body);

    if(!product){
      return res.status(404).json({message:"product not found"});
    }

    const updatedProduct= await Product.findById(id);
    res.status(200).json(updatedProduct);

      } catch (error) {

        res.status(500).json({message:error.message});

      }


})

//delete
app.delete("/api/products/:id",async (req,res)=>{
try{
  const{id}=req.param;
  const product = await Product.findByIdAndDelete(id);

  if(!product){
    res.status(400).json({message:"product not found"})
  }

  res.status(200).json({message:"product deleted"})

}
catch{
  res.status(500).json({message:error.message})
}

})

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
