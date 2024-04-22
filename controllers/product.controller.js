//passing model
const Product =require ("../models/product.model.js");

// Read using the product model to read data
const getProducts = async (req,res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message:error.message});
    }

}

//read using for one product the id
const getProduct=async (req,res) =>{
     try{

    const{id}=req.params;
    const product=await Product.findById(id);
    res.status(200).json(product);

  }catch(error){
    res.status(500).json({message:error.message});
  }

}

// Create using the product model to create data
const createProduct=async(req,res)=>{
    
    //testing
    //console.log(req.body);
    //res.send(req.body);

    try {
       const product = await Product.create(req.body);
       res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }


};

//update
//edit using the product model to edit data
const updateProduct=async (req,res)=>{

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
    
    
    };
//delete
//edit using the product model to edit data
const deleteProduct=async (req,res)=>{
    try{
      const {id} =req.params;
      const product = await Product.findByIdAndDelete(id);
    
      if(!product){
        res.status(400).json({message:"product not found"})
      }
    
      res.status(200).json({message:"product deleted"})
    
    }
    catch{
      res.status(500).json({message:error.message})
    }
    
    };

    // crud exporting controllers
module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}