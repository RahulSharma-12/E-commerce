const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");


exports.createProduct = async (req, res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product
    })
}

// Get All product
exports.getAllProducts = async(req,res) =>{
    const products = await Product.find();



    res.status(200).json({
        success :true,
        products
        });
} 


// Update product

exports.updateProduct = async (req,res,next) =>{
    let product = Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators : true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    }) 
}


// delete product

exports.deleteProduct = async(req, res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : false,
            message : "Product not found"
        })
    } 

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message :"Product Delete Successfully"
    })
} 


// Get Product Details

exports.getProductDetails = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : false, 
            message : "Product not found",
        });

        // return next(new ErrorHandler("Product  Not Found", 404));
    }  

    res.status(200).json({ 
        success:true,
        product 
    })
}