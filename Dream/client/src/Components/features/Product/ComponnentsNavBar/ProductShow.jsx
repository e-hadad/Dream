import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct, deleteProduct, setListProduct, UpdateProduct } from "../ProductSlice";
import { addCart } from '../../Cart/CartSlice'
import Signal from "../SignalProduct";
import AddToCart from '../../Cart/Cart';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import './ProductCss.css';
import { useNavigate, useParams } from "react-router-dom";
export function ProductShow() {
  const [showMiniCart, setShowMiniCart] = useState(false);
  let { type } = useParams();
  let dis = useDispatch();
  const navigate = useNavigate();
  let idAdmin = useSelector((s) => s.user?.idAdmin || '');
  let admin = useSelector((s) => s.user?.admin || '')
  let allProducts = useSelector((state) => state.products.listProduct || []);
  // let products = allProducts.filter((p) => p.category === type)
  let status = useSelector((s) => s.products.status)
  // let filteredProducts = useSelector(state => state.products.listProduct || []);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [flag, setFlag] = useState(true);
  // let flag=true
  useEffect(() => {
    dis(getListProduct());
  }, [dis])

  //   useEffect(() => {
  //   const filtered = allProducts.filter(p => p.category === type);
  //   dis(setListProduct(filtered));
  // }, [allProducts, type, dis]);
  useEffect(() => {
    const filteredByCategory = allProducts.filter(p => p.category === type);
    setFilteredProducts(filteredByCategory);
  }, [allProducts, type]);
  useEffect(() => {
    const filteredByCategory = allProducts.filter(p => p.category === type);
    console.log("Filtered products:", filteredByCategory.map(p => p.id)); // בדקי את ה־id-ים
    setFilteredProducts(filteredByCategory);
  }, [allProducts, type]);

  const addProductToCart = (id) => {
    if (admin == 0 || admin == '') {
      alert("הנך צריך להתחבר")
      navigate(`/Login`)
      return
    }
    const product = filteredProducts.find((p) => p.id === id)
    if (product.count == 0) {
      alert("המוצר אזל מהמלאי")
      return;
    }
    const updatedProduct = { ...product, count: product.count - 1 };
    dis(addCart({ userId: idAdmin, product }))
    // product.count--;
    dis(UpdateProduct(updatedProduct))
    setShowMiniCart(true);
    setTimeout(() => {
      setShowMiniCart(false);
    }, 6000);
    // });
  }

  let delProduct = (id) => {
    dis(deleteProduct(id))
  }
  let updatePro = (p) => {
    navigate(`/UpdateProduct/${p.id}`)
  }

  const filterProduct = (e) => {
    const val = e.target.value;
    console.log("val: ", val)
    if (val === "") {
      setFlag(true);
      const filteredByCategory = allProducts.filter(p => p.category === type);
      setFilteredProducts(filteredByCategory);
    }
    else {
      const filtered = allProducts.filter(p => p.category === type && (p.price === Number(val) || p.title.toLowerCase().includes(val.toLowerCase())));
      if (filtered != [])
        setFlag(false);
      else
        setFlag(true);

      setFilteredProducts(filtered);
    }
  }

  return (
    <>
      {status === "loading" && <h1>Loading...</h1>}
      {status === "failed" && <h1>Failed</h1>}
      {/* {showMiniCart && (
        <div className="miniCart">
          ✅ המוצר נוסף לסל
        </div>
      )} */}
      {showMiniCart && (
        <div className="floating-cart">
          <AddToCart mini={true} productId={idAdmin} />
        </div>
      )}
      <input className="fillterProduct" onChange={filterProduct} placeholder="הכנס לפי מה אתה רוצה לחפש"></input>
      {flag == false && <p>אין תוצאות לחיפוד שלך</p>}
      <div className="ProductCss">{filteredProducts.map((p) => (
        // < React.Fragment key={p.id}>
        <div className="productCard" key={p.id}>
          <Signal p={p} />
          {admin === "manager" && (
            <>
            <IconButton onClick={() => updatePro(p)} aria-label="עדכון">
                <EditIcon style={{ fontSize: 24 }} />
              </IconButton>
              <IconButton onClick={() => delProduct(p.id)} aria-label="מחק">
                <DeleteIcon style={{ fontSize: 24 }} />
              </IconButton>
              {/* <button onClick={() => delProduct(p.id)}>מחק מוצר</button> */}
              {/* <button onClick={() => updatePro(p)}>עדכן מוצר</button> */}
              
            </>
          )}
          {admin !== "manager" && (
            <button onClick={() => addProductToCart(p.id)}>הוסף לסל</button>
          )}
        </div>
        // </React.Fragment>

      ))}
      </div>

    </>
  )

}
export default ProductShow;