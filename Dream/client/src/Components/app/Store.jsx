import { configureStore }  from '@reduxjs/toolkit';
import producstReducer from '../features/Product/ProductSlice';
import login from '../features/Login/LoginSlice';
// import setAdmin from '../features/Login/LoginSlice';
import  CartOrderSlice  from '../features/Cart/CartSlice';
import UsersOrderSlice from '../features/Users/UsersSlice';

export const store=configureStore({
    reducer:{
        products:producstReducer,
        user:login,
        // setAdmin:setAdmin,
        CartOrder:CartOrderSlice,
        UsersOrder:UsersOrderSlice,
        // middleware:() => [] 
    },
})
export default store;  
