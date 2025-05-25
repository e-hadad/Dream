import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrder, getListUser } from '../../Users/UsersSlice';
import { deleteOrder } from '../../Cart/CartSlice'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './Orderhistory.css';

export default function Orderhistory() {
    const dispatch = useDispatch();
    const [openOrderId, setOpenOrderId] = useState(null);

    // הנתונים מהסטייט
    const users = useSelector((state) => state.UsersOrder?.listUsers || []);
    const orders = useSelector((state) => state.UsersOrder?.listOrders || []);
    const userId = useSelector((s) => s.user?.idAdmin || '');
    //   let idAdmin = useSelector((s) => s.user?.idAdmin || '')

    // סינון הזמנות לפי userId
    const userOrders = orders.filter(order => String(order.userId) === String(userId));

    useEffect(() => {
        dispatch(getListUser());
        dispatch(getListOrder());
        // if(userId==userId){
        //      userOrders = orders.filter(order => String(order.userId) === String(userId))
        // }
    }, [dispatch]);

    const toggleOrder = (orderId) => {
        setOpenOrderId(prev => (prev === orderId ? null : orderId));
    };
    const deleteOr = ( orderId) => {
        dispatch(deleteOrder({ userId: userId, productId: orderId })).then(() => {
            // רענון מחדש של ההזמנות לאחר המחיקה
            dispatch(getListOrder());
        });
    }
    return (
        <div className='user-orders'>
            <h2>היסטוריית ההזמנות שלך</h2>
            {userOrders.length === 0 && <p>אין הזמנות להצגה.</p>}
            {userOrders.map(order => (
                <div key={order.id} className="order-summary">
                    <div className="order-header">
                        <p><strong>מספר הזמנה:</strong> {order.id}</p>
                        <p><strong>תאריך הזמנה:</strong> {order.orderDate || '---'}</p>
                        <p>
                            <strong>תאריך אספקה:</strong>{' '}
                            {order.dueDate ? new Date(order.dueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            }).replace(/\//g, '.') : '---'}
                        </p>                        <button onClick={() => toggleOrder(order.id)}>
                            {openOrderId === order.id ? 'הסתר פרטים' : 'הצג פרטים'}
                        </button>
                        {new Date(order.dueDate) > new Date() && (
                            // <button onClick={() => deleteOr(order.id)}>מחק הזמנה</button>
                            <IconButton onClick={() => deleteOr(order.id)} aria-label="מחק">
                                <DeleteIcon style={{ fontSize: 24 }} />
                            </IconButton>

                        )}
                    </div>
                    {openOrderId === order.id && (
                        <div className="order-details">
                            {order.cart && order.cart.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>שם מוצר</th>
                                            {/* <th>תיאור</th> */}
                                            <th>כמות</th>
                                            <th>מחיר ליח'</th>
                                            {/* <th>סה"כ</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.cart.map((item, index) => {
                                            const quantity = item.qty ?? item.count ?? 1;
                                            const price = Number(item.price || 0);
                                            // const total = price * quantity;

                                            return (
                                                <tr key={index}>
                                                    <td>{item.title || `מוצר ${item.title}`}</td>
                                                    {/* <td>{item.description || '-'}</td> */}
                                                    <td>{quantity}</td>
                                                    <td>{price.toFixed(2)} ₪</td>
                                                    {/* <td>{total.toFixed(2)} ₪</td> */}
                                                </tr>

                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <p>אין פריטים בהזמנה זו.</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
