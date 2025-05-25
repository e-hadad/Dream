import React, { use, useRef } from "react";
import { useDispatch } from "react-redux";
import { getListProduct, UpdateProduct } from "./ProductSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";

import './change.css'
const finalOrder = () => {
    const { id } = useParams();
    const dis = useDispatch();
    const navigate = useNavigate();
    const [flagUpdate, setflagUpdate] = useState(false);


    useEffect(() => {
        dis(getListProduct());
        console.log("update product");
    }, [dis])
    const products = useSelector((state) => state.products.listProduct || []);
    const product = products.find((p) => p.id == id);
    const titleRef = useRef()
    const priceRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
    const imageRef = useRef()
    const countRef = useRef()

    if (!product) {
        console.log("no product");
        return <h2>טוען מוצר...</h2>;
    }

    const UpdateProd = () => {
        // dis(deleteProduct(product.id));
        // dis(addProduct({
        //     title:titleRef.current.value,
        //     price:priceRef.current.value,
        //     description:descriptionRef.current.value,
        //     category:categoryRef.current.value,
        //     image:imageRef.current.value,
        //     count:countRef.current.value
        // }));
        dis(UpdateProduct({
            id: product.id,
            title: titleRef.current.value,
            price: Number(priceRef.current.value),
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            image: imageRef.current.value,
            count: Number(countRef.current.value)
        })
        )
        setflagUpdate(true);
        setTimeout(() => {
            setflagUpdate(false);
            navigate(`/ProductShow/${categoryRef.current.value}`)

        }, 3000)



    }


    return (
        <div className="add-product-form">
            {flagUpdate && (
                <div className="upLabale">
                    ✅ המוצר עודכן
                </div>
            )}
            <h3>enter the details of the product:</h3>
            <label>title</label>
            <input type="text" ref={titleRef} defaultValue={product.title} />
            <label>price</label>
            <input type="number" ref={priceRef} defaultValue={product.price} />
            <label>description</label>
            <input type="text" ref={descriptionRef} defaultValue={product.description} />
            <label>category</label>
            <input type="text" ref={categoryRef} defaultValue={product.category} />
            <label>image</label>
            <input type="text" ref={imageRef} defaultValue={product.image} />
            <label>count</label>
            <input type="number" ref={countRef} defaultValue={product.count} />
            <button onClick={UpdateProd}>עדכן מוצר</button>
        </div>
    );

}

export default finalOrder;