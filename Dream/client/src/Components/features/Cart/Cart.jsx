import React, { use } from "react";
import { useParams } from "react-router-dom";
import { addOrder } from "./CartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getListOrder, deleteCartUser } from "./CartSlice";
import { getListUser } from '../Login/LoginSlice'
// import { deleteFromCart } from "../Product/ProductSlice";
import { getListProduct } from '../Product/ProductSlice'
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
// import { addCart } from './CartSlice'
import { deleteFromCart, addCart, del1productFromCart, setCart, getCartById } from './CartSlice'
import { UpdateProduct } from "../Product/ProductSlice"
const AddToCart = ({ mini }) => {

  // const {id}=useParams();
  let dis = useDispatch();
  let idAdmin = useSelector((s) => s.user?.idAdmin || '')
  const navigate = useNavigate();
  const cartShow = useSelector((c) => c.CartOrder.cart || []);
  // const users = useSelector((state) => state.user?.listUsers || []);
  let products = useSelector((state) => state.products.listProduct || []);
  // const cartId = users.find((c) => c.id === idAdmin);
  const totalAmount = cartShow.reduce((sum, p) => sum + p.price * p.count, 0);

  useEffect(() => {
    if (idAdmin) {
      dis(getCartById(idAdmin));
    }
  }, [idAdmin]);

  useEffect(() => {
    dis(getListOrder());
    console.log("37 : idAdmin", idAdmin)
  }, [dis]);

  useEffect(() => {
    dis(getListUser())
    // dis(getCartById(idAdmin));
    dis(getListProduct())
    console.log("idAdmin", idAdmin);
  }, [dis])




  // const orders = useSelector((state) => state.CartOrder.listOrders || []);
  // const idAdmin = useSelector((s) => s.user?.idAdmin || '');
  // useEffect(() => {
  //   console.log("✅ Orders were updated:", orders);
  // }, [orders]);
  // const cart = useSelector((state) => state.CartOrder.listCart || []);
  // console.log("cartId", cartId);
  // console.log("cart", cartId);


  const AddToOrder = () => {
    // alert("ההזמנה בוצעה בהצלחה");
    navigate(`/Pay/${idAdmin}`)
    // dis(addOrder({
    //   id: orders.length + 1,
    //   userId: idAdmin,
    //   orderDate: new Date().toLocaleDateString('he-IL'),
    //   cart: cartId.map(p => ({
    //     id: p.id,
    //     name: p.name,
    //     price: p.price,
    //     count: p.count
    //   }))
    //   ,
    //   status: "ההזמנה בוצעה בהצלחה"
    // })).then(() => {
    //   dis(deleteCartUser(idAdmin))
    // }).then(() => {
    //   dis(getCartById(idAdmin));
    // })
  }

  const deleteProduct = (idProduct, count) => {
    const product = products.find((p) => p.id === idProduct)
    dis(deleteFromCart({ userId: idAdmin, productId: idProduct }))
    // .then(() => {
    //   // console.Console.log("83  cartShow.fillter(c => c.id != idProduct)",cartShow.fillter(c => c.id != idProduct))
    //   // cartShow=cartShow.fillter(c => c.id != idProduct)
    //   // dis(setCart(cartShow.fillter(c => c.id != idProduct)))
    //   // dis(getCartById(idAdmin));
    // });
    const updatedProduct = { ...product, count: product.count + count };
    dis(UpdateProduct(updatedProduct))
  }

  const addProductToCart = (id) => {
    const product = products.find((p) => p.id === id)
    if (product.count == 0) {
      alert("המוצר אזל מהמלאי")
      return;
    }
    const updatedProduct = { ...product, count: product.count + 1 };
    dis(UpdateProduct(updatedProduct))

    // const i = products.findIndex((p) => p.id === id)
    // dis(getCartById(idAdmin));
    dis(addCart({ userId: idAdmin, product }));
    // dis(setCart())
    // let proIndex = cartShow.findIndex(p => p.id == id)
    // console.log("98 cartShow[proIndex]",cartShow[proIndex])
    // cartShow[proIndex].count++;
    // dis(setCart(cartShow))
    // dis(getCartById(idAdmin));
    // })
  }

  const delProductToCart = (id) => {
    const product = products.find((p) => p.id === id)
    if (!product)
      return;
    dis(del1productFromCart({ userId: idAdmin, product }))
    let proIndex = cartShow.findIndex(p => p.id == id)
    const updatedProduct = { ...product, count: product.count + 1 };
    dis(UpdateProduct(updatedProduct))
    // console.log("111 cartShow[proIndex]",cartShow[proIndex])
    // cartShow[proIndex].count--;
    // dis(setCart(cartShow))
    // dis(getCartById(idAdmin));
  }
  console.log("idAdmin:", idAdmin);
  useEffect(() => {
    console.log("cartShow:", cartShow);
  }, [cartShow]);
  return (
    <div className={mini ? "mini-cart" : ""}>
      {mini ? (
        <>
          <h4>🛒 בעגלה:</h4>
          {cartShow.length === 0 ? (
            <p>אין פריטים</p>
          ) : (
            cartShow.slice(0, 3).map((p, i) => (
              <p key={i}>
                {p.title} - {p.count} יח'
              </p>
            ))
          )}
        </>
      ) : (
        <>
          <p>🛒 פרטי העגלה שלך ({idAdmin})</p>
          {cartShow.length > 0 && (
            <>
              <h3>סה"כ לתשלום: {totalAmount} ש"ח</h3>
              <button onClick={AddToOrder}>אישור הזמנה</button>
            </>
          )}
          {Array.isArray(cartShow) && cartShow.length > 0 ? (
            cartShow.map((p, index) => (
              <div key={`${p.id}-${index}`} className="product-item">
                <h3>{p.title}</h3>
                {/* <h3>קטגוריה: {p.category}</h3> */}
                <h3>מחיר: {p.price}</h3>
                <div className="changCount">
                  <IconButton onClick={() => addProductToCart(p.id)} aria-label="הוסף"><AddIcon /></IconButton>
                  <div className="quantity-display">{p.count}</div>
                  <IconButton onClick={() => delProductToCart(p.id)} aria-label="הפחת"><RemoveIcon /></IconButton>
                </div>
                <IconButton
                  onClick={() => deleteProduct(p.id, p.count)}
                  aria-label="מחק"
                // style={{ padding: 0, width: 24, height: 24 }}
                >
                  <DeleteIcon style={{ fontSize: 24 }} />
                </IconButton>
                <h5>סה"כ: {p.price * p.count}</h5>
              </div>
            ))
          ) : (
            <p>אין מוצרים בעגלה</p>
          )}

          {cartShow.length > 0 && (
            <button onClick={AddToOrder}>לתשלום</button>
          )}
        </>
      )}
    </div>
  );
};


export default AddToCart;