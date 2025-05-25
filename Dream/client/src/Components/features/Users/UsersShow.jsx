// import React, { useEffect, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getListOrder,getListUser } from './UsersSlice';
// import { useState } from 'react';
// export default function UsersShow() {
//     let dis=useDispatch();
    
//     // let status=useSelector((s)=>s.user?.status||'')
//     // let admin=useSelector((s)=>s.user?.admin||'')

//     const [selectedUserId, setSelectedUserId] = useState(null); // משתמש שנבחר
//     let users=useSelector((state)=>state.UsersOrder?.listUsers||[]);
//     let orders=useSelector((state)=>state.UsersOrder?.listOrders||[]);


//     useEffect(()=>{
//         dis(getListUser());
//         dis(getListOrder());
//     },[dis])
    
//     const getOrdersByUserId=(id)=>{
//         // console.log(orders);
//         // console.log("get order by id",id);
//         // console.log(orders.filter((o)=>o.userId===id));
//         return orders.filter((o)=>o.userId===id)
   
//     }
//     const toggletOrders=(id) => {
//         setSelectedUserId(prevId => (prevId === id ? null : id));
//     }
//     return(
//         <> 
//         <div className='UsersOrder'>
//             {users.map((u)=>(
//                 <div key ={u.id} className='UsersOrderShow'>
//                     <div>
//                         <h3>שם משתמש: {u.name}</h3>
//                         <h3>סיסמא: {u.password}</h3>
//                         <button onClick={() => toggletOrders(u.id)}>
//                             {selectedUserId === u.id ? 'הסתר הזמנות' : 'הזמנות'}
//                         </button>
//                         {selectedUserId === u.id && (
//                             <div>
//                                 <h3>הזמנות:</h3>
//                                 {getOrdersByUserId(u.id).map((o) => (
//                                     <div key={o.id}>
//                                         <p>מספר הזמנה: {o.id}</p>
//                                         <p>סטטוס: {o.orderDate}</p>
//                                         {/* הוסף כאן מידע נוסף על ההזמנה */}
//                                         <p>מוצרים:</p>
//                                         <ul>
//                                             {o.cart.map((p) => (
//                                                 <li key={p.id}>{p.price}</li>
//                                             ))} 
//                                         </ul>
                                        
//                                     </div>
//                                 ))}
//                             </div>)}
//                     </div>
//                 </div>
//             ))}
//         </div>
//         </>
//     ) 
// }

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListOrder, getListUser } from './UsersSlice';
import './Users.css'
export default function UsersShow() {
  let dis = useDispatch();

  const [selectedUserId, setSelectedUserId] = useState(null);
  let users = useSelector((state) => state.UsersOrder?.listUsers || []);
  let orders = useSelector((state) => state.UsersOrder?.listOrders || []);

  useEffect(() => {
    dis(getListUser());
    dis(getListOrder());
  }, [dis])

  const getOrdersByUserId = (id) => {
    return orders.filter((o) => o.userId === id)
  }

  const toggleOrders = (id) => {
    setSelectedUserId(prevId => (prevId === id ? null : id));
  }

  return (
    <>
      <div className='users-order-container'>
        {users.map((u) => (
          <div key={u.id} className='user-card'>
            <div className='user-info'>
              <h3 className='user-name'>שם משתמש: {u.name}</h3>
              <h4 className='user-password'>סיסמא: {u.password}</h4>
              <button className='toggle-orders-btn' onClick={() => toggleOrders(u.id)}>
                {selectedUserId === u.id ? 'הסתר הזמנות' : 'הצג הזמנות'}
              </button>
            </div>

            {selectedUserId === u.id && (
              <div className='orders-list'>
                <h3>הזמנות:</h3>
                {getOrdersByUserId(u.id).length === 0 ? (
                  <p className='no-orders'>אין הזמנות למשתמש זה.</p>
                ) : (
                  getOrdersByUserId(u.id).map((o) => (
                    <div key={o.id} className='order-card'>
                      <p><strong>מספר הזמנה:</strong> {o.id}</p>
                      <p><strong>תאריך הזמנה:</strong> {o.orderDate}</p>
                      <p><strong>מוצרים:</strong></p>
                      <ul>
                        {o.cart.map((p) => (
                          <li key={p.id}>{p.title || p.name} - ₪{p.price} x {p.count}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
