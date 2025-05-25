import React from "react";
import './ProductSignal.css';
import { useSelector } from "react-redux";
const signalProduct = (props) => {
    let p=props.p;
    console.log("p.image",p.image)
    return ( 

    <>
    <div className="productSignal">
        <h3>{p.title}</h3>
        <img src={`http://localhost:4000${p.image}`} alt={p.id} />
        <h5>{ p.price + " שח"}</h5>
        {/* <h6>{p.description}</h6> */}
        <h6>{"כמות במלאי: "+p.count }</h6>
    </div>
    </> );
}
 
export default signalProduct;