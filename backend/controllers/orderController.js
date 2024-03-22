const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");


// Ceate new order
// exports.newOrder =  catchAsyncError(async(req,res,next)=>{

//      const {shippingInfo, orderItems, paymentinfo, itemsPrice, taxPrice, shippingPrice, totalPrice}=req.body;

//      const order = await Order.create({

//         shippingInfo, orderItems, paymentinfo, itemsPrice, taxPrice, shippingPrice, totalPrice,
//         paidAt: Date.now(),
//         user:req.user._id,
         
//      });
        
//         res.status(201).json({
//             success:true,
//             order,
//         });

// });



// new
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });


  // get single order

  exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
     const order = await Order.findById(req.params.id).populate("user"," name email");

     if(!order){
        return next(new ErrorHandler("order not found with this Id", 404));
     }

     res.status(200).json({
        success:true,
        order,
     });
       
  });


  // get logged in user order

  exports.myOrder = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
       success:true,
       orders,
    });
      
 });

 
  // get All order(Admin)

  exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();


      let totalAmount =0 ;
        
       orders.forEach((order)=>{
        totalAmount += order.totalPrice;
       });

    res.status(200).json({
       success:true,
       totalAmount,
       orders,
    });
      
 });
 
 

 
  // Update order status (Admin)

  exports.updateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);


//       if(order.orderStatus === "Delivered"){
//          return next(new ErrorHandler("You hava alredy delivered this order",400));
//       }

//       order.orderItems.forEach(async(order)=>{
//         await updateStock(order.Product , order.quantity);
//       });

//       order.orderStatus = req.body.status;
//        if(req.body.status === "Delivered"){
//         order.deliveredAt = Date.now();
//        }


//     res.status(200).json({
//        success:true,
//        totalAmount,
//        orders,
//     });
      
//  });

//  async function updateStock (id, quantity){
//     const product = await Product.findById(id);

//     product.stock -= quantity;

//     await product.save({ validateBeforeSave : false}); 

//  }
if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
} 


  // delete order(Admin)

  exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await order.deleteOne();
  
    res.status(200).json({
      success: true,
    });
  });
 

