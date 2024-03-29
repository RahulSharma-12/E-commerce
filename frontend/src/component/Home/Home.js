 import React from 'react'
 import { CgMouse} from "react-icons/cg"
 import "./Home.css"
 import Product from "./Product.js"
 import MetaData from "../layout/MetaData"

 const product ={
    name:"Blue Tshirt",
    images:[{url: "https://i.ibb.co/DRST11n/1.webp"}],
price : "3000",
_id: "rahul",
 }
 const Home = () => {
   return (
     <>
     <MetaData title="ECOMMERCE"/>
        <div className="banner">
        <p>Welcome to E-commerce</p>
        <h1>Find Amazing Product Below</h1>

        <a href="#container">
            <button>
                Scroll <CgMouse/>
            </button>
        </a>
        </div>

        <h2 className="homeHeading">Featured products</h2>
        <div className="container" id="container">
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        </div>
     </>
   )
 }
 
 export default Home;


 
