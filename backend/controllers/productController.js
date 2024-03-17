const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeature");




exports.createProduct = catchAsyncError(async (req, res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product,
    })
});
 
// Get All product
exports.getAllProducts = catchAsyncError(async(req,res) =>{
    const resultPerPage = 5;
const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    // const products = await Product.find();
    const products = await apiFeature.query;




    res.status(200).json({
        success :true,
        products,
        productCount,
        });
});


// Update product

exports.updateProduct = catchAsyncError(async (req,res,next) =>{
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
});


// Get Product Details

exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
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
}  );


// delete product

exports.deleteProduct = catchAsyncError(async(req, res,next)=>{
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
});


