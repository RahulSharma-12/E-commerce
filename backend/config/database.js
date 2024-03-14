const mongoose = require("mongoose");


const connectDatabase = ( )=>{

// mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true}).then(
//     (data)=>{
//         console.log(`Mongodb connected with server : ${data.connection.host}`);
//     }).catch((err)=>{
//         console.log(err)
//     })



// mongoose.connect("mongodb://localhost:27017/Ecommerce",{useNewParser:true, useUnifiedTopology:true, useCreateIndex:true}).then(
// mongoose.connect(process.env.DB_URI,
//     {useNewParser:true,
//          useUnifiedTopology:true,
//         //   useCreateIndex:true
//         })
//     .then(
//     (data)=>{
//         console.log("Mongodb connected with server"); 
//         // console.log(`Mongodb connected with server: ${data.connection.host}`); 
//     }).catch((err)=>{
//     console.log(err);
// })

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex:true
})
.then(db => console.log(`MongoDb connected with server :`))
.catch(err => console.log(err));
}
 
module.exports = connectDatabase;