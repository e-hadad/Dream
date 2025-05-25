import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./ProductSlice";
import './change.css'
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const dis = useDispatch();
    let titleRef = useRef()
    let priceRef = useRef()
    let descriptionRef = useRef()
    let categoryRef = useRef()
    let imageRef = useRef()
    let countRef = useRef()
    const [flagAdd, setflagAdd] = useState(false);
    let navigate = useNavigate()


    const AddProd = () => {
        // const randomNumber = Math.floor(Math.random() * 10) + 1;
        // console.log(randomNumber);
        dis(addProduct({
            // id: randomNumber,
            title: titleRef.current.value,
            price: priceRef.current.value,
            // description:descriptionRef.current.value,
            category: categoryRef.current.value,
            image: imageRef.current.value,
            count: countRef.current.value
        }));
        setflagAdd(true);
        setTimeout(() => {
            setflagAdd(false);
            navigate(`/ProductShow/${categoryRef.current.value}`)

        }, 3000)
    }

    return (

        <div className="add-product-form ">
            {flagAdd && (
                <div className="upLabale">
                    המוצר נוסף בהצלחה                
                </div>
            )}
            <h3>enter the details of the product:</h3>
            <label>title</label>
            <input type="text" ref={titleRef} placeholder="title" />
            <label>price</label>
            <input type="number" ref={priceRef} placeholder="price" />
            {/* <label>description</label>
    <input type="text" ref={descriptionRef} placeholder="description" /> */}
            <label>category</label>
            <input type="text" ref={categoryRef} placeholder="category" />
            <label>image</label>
            <input type="text" ref={imageRef} placeholder="image" />
            <label>count</label>
            <input type="number" ref={countRef} placeholder="count" />
            <button onClick={AddProd}>add</button>
        </div>
    );
}

export default AddProduct;