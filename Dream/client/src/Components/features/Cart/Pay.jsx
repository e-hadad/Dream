// import React from 'react';
// import { useEffect } from 'react'
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import { addOrder } from './CartSlice';
// import {getListUser} from '../Users/UsersSlice'
// import { useDispatch, useSelector } from 'react-redux';

// import './cart.css';

// export default function Pay({ totalAmount, onPaymentSuccess }) {
//     let {id}=useParams();
//     let users = useSelector((state) => state.UsersOrder?.listUsers || []);
//     let cart=users.find((c)=>c.id==id)
//   let dis = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//     useEffect(() => {
//     dis(getListUser());
//   }, [dis])
//   const onSubmit = (data) => {
//     alert(`התשלום בסך ${totalAmount} ש"ח בוצע בהצלחה!`);
//     // onPaymentSuccess();
// alert(`התשלום בסך ${totalAmount} ש"ח בוצע בהצלחה!`);

//     dis(addOrder({
//       id: 0,
//       userId: id,
//       orderDate: new Date().toLocaleDateString('he-IL'),
//       cart: cart.map(p => ({
//         id: p.id,
//         name: p.name,
//         price: p.price,
//         count: p.count
//       }))
//       ,
//       status: "ההזמנה בוצעה בהצלחה"
//     }))
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
//       <h2>פרטי תשלום</h2>

//       <label>מספר כרטיס אשראי:</label>
//       <input
//         type="text"
//         placeholder="1234 5678 9012 3456"
//         {...register('cardNumber', {
//           required: 'יש להזין מספר כרטיס',
//           pattern: {
//             value: /^\d{16}$/,
//             message: 'מספר כרטיס חייב להיות בן 16 ספרות',
//           },
//         })}
//       />
//       {errors.cardNumber && (
//         <p className="error-message">{errors.cardNumber.message}</p>
//       )}

//       <label>שם בעל הכרטיס:</label>
//       <input
//         type="text"
//         placeholder="שם מלא"
//         {...register('cardName', {
//           required: 'יש להזין שם בעל הכרטיס',
//           minLength: { value: 2, message: 'השם חייב להכיל לפחות 2 תווים' },
//         })}
//       />
//       {errors.cardName && (
//         <p className="error-message">{errors.cardName.message}</p>
//       )}

//       <label>תוקף (MM/YY):</label>
//       <input
//         type="text"
//         placeholder="MM/YY"
//         maxLength={5}
//         {...register('expiryDate', {
//           required: 'יש להזין תוקף כרטיס',
//           pattern: {
//             value: /^(0[1-9]|1[0-2])\/\d{2}$/,
//             message: 'פורמט תוקף לא תקין',
//           },
//         })}
//       />
//       {errors.expiryDate && (
//         <p className="error-message">{errors.expiryDate.message}</p>
//       )}

//       <label>CVV:</label>
//       <input
//         type="password"
//         placeholder="123"
//         maxLength={3}
//         {...register('cvv', {
//           required: 'יש להזין CVV',
//           pattern: {
//             value: /^\d{3}$/,
//             message: 'CVV חייב להיות בן 3 ספרות',
//           },
//         })}
//       />
//       {errors.cvv && <p className="error-message">{errors.cvv.message}</p>}

//       <button type="submit">שלח תשלום ({totalAmount} ש"ח)</button>
//     </form>
//   );
// }

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getCartById, deleteCartUser } from './CartSlice';
import { getListUser } from '../Users/UsersSlice';

import './cart.css';

export default function Pay({ totalAmount }) {
  const { id } = useParams();
  const dis = useDispatch();

  const users = useSelector((state) => state.UsersOrder?.listUsers || []);
  const user = users.find((u) => u.id == id);
  const cart = user?.cart || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dis(getListUser());
  }, [dis]);

const onSubmit = (data) => {
  // alert(`התשלום בסך ${totalAmount} ש"ח בוצע בהצלחה!`);
    alert("ההזמנה בוצעה בהצלחה","תודה שקניתם ");

  const cleanCart = cart.map(({ title, price, count }) => ({
    title,
    price,
    count,
  }));

  dis(addOrder({
    userId: id,
    orderDate: new Date().toLocaleDateString('he-IL'),
    dueDate: new Date(),
    address: data.address,
    nameToRemittance: data.nameToRemittance,
    cart: cleanCart,
    status: "ההזמנה בוצעה בהצלחה",
  })).then(() => {
    dis(deleteCartUser(id));
  });
};
return (
  <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
    <h2>פרטי תשלום</h2>
    <label>שם למשלוח:</label>
    <input
      type="text"
      placeholder="שם מקבל ההזמנה"
      {...register('nameToRemittance', {
        required: 'יש להזין שם למשלוח',
        minLength: { value: 2, message: 'השם חייב להכיל לפחות 2 תווים' },
      })}
    />
    {errors.nameToRemittance && <p className="error-message">{errors.nameToRemittance.message}</p>}

    <label>כתובת למשלוח:</label>
    <input
      type="text"
      placeholder="רחוב, מספר, עיר"
      {...register('address', {
        required: 'יש להזין כתובת למשלוח',
        minLength: { value: 5, message: 'הכתובת חייבת להכיל לפחות 5 תווים' },
      })}
    />
    {errors.address && <p className="error-message">{errors.address.message}</p>}

    <label>מספר כרטיס אשראי:</label>
    <input
      type="text"
      placeholder="1234 5678 9012 3456"
      {...register('cardNumber', {
        required: 'יש להזין מספר כרטיס',
        pattern: {
          value: /^\d{16}$/,
          message: 'מספר כרטיס חייב להיות בן 16 ספרות',
        },
      })}
    />
    {errors.cardNumber && <p className="error-message">{errors.cardNumber.message}</p>}

    <label>שם בעל הכרטיס:</label>
    <input
      type="text"
      placeholder="שם מלא"
      {...register('cardName', {
        required: 'יש להזין שם בעל הכרטיס',
        minLength: { value: 2, message: 'השם חייב להכיל לפחות 2 תווים' },
      })}
    />
    {errors.cardName && <p className="error-message">{errors.cardName.message}</p>}

    <label>תוקף (MM/YY):</label>
    <input
      type="text"
      placeholder="MM/YY"
      maxLength={5}
      {...register('expiryDate', {
        required: 'יש להזין תוקף כרטיס',
        pattern: {
          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
          message: 'פורמט תוקף לא תקין',
        },
      })}
    />
    {errors.expiryDate && <p className="error-message">{errors.expiryDate.message}</p>}

    <label>CVV:</label>
    <input
      type="password"
      placeholder="123"
      maxLength={3}
      {...register('cvv', {
        required: 'יש להזין CVV',
        pattern: {
          value: /^\d{3}$/,
          message: 'CVV חייב להיות בן 3 ספרות',
        },
      })}
    />
    {errors.cvv && <p className="error-message">{errors.cvv.message}</p>}

    <button type="submit">שלח תשלום ({totalAmount} ש"ח)</button>
  </form>
);
}
