import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    listOrders: [],
    // listCart:[]
    cart: []
}

export const getListCart = createAsyncThunk("Carts", async () => {
    try {
        const response = await axios.get("http://localhost:4000/cart");
        // console.log(response.data);
        return response.data;
    }
    catch {
        console.log("Error");
    }
})
export const getCartById = createAsyncThunk("cart", async (id) => {
    try {
        const response = await axios.get(`http://localhost:4000/user/getCartById/${id}`);
        // console.log("cart", response.data);

        return response.data;

    }
    catch {
        console.log("Error");
    }
})

// export const addCart = createAsyncThunk("addCart", async (cart, thunkAPI) => {
//     try {
//         const response = await axios.post("http://localhost:4000/order", cart);
//         return response.data; // מחזיר את מה שהשרת מחזיר
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         return thunkAPI.rejectWithValue(error.response?.data || "Network error");
//     }
// });

export const addOrder = createAsyncThunk("addOrder", async (order) => {
    try {
        const response = await axios.post("http://localhost:4000/order", order);
        // const response = await axios.get("https://fakestoreapi.com/products");
        // const response A= await axios.get("https://jsonplaceholder.typicode.com/posts");
        // console.log(response.data);
        return response.data
    }
    catch {
        console.log("Error");
    }
})
export const getListOrder = createAsyncThunk("orders", async () => {
    try {
        const response = await axios.get("http://localhost:4000/order");
        // const response = await axios.get("https://fakestoreapi.com/products");
        // const response A= await axios.get("https://jsonplaceholder.typicode.com/posts");
        // console.log(response.data);
        return response.data;
    }
    catch {
        console.log("Error");
    }
})
// export const updateProductCount = createAsyncThunk(
//   "cart/updateCount",
//   async ({ userId, productId }, thunkApi) => {
//     try {
//       const response = await axios.put(`http://localhost:4000/user/updateCount/${userId}/${productId}`);
//       return response.data.cart;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.response?.data || "שגיאה לא ידועה");
//     }
//   }
// );
export const del1productFromCart = createAsyncThunk("cart/del1productFromCart", async ({ userId, product }, thunkApi) => {
    try {
        // console.log("??????????????????????????????????");
        const response = await axios.post(`http://localhost:4000/user/del1ProductToCart/${userId}`, product)
        return response.data;
    }
    catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "שגיאה לא ידועה")
    }

})
export const deleteCartUser = createAsyncThunk("cart/daleteCart", async (id) => {
    try {
        const response = await axios.delete(`http://localhost:4000/user/deleteCartUser/${id}`);
        // console.log("cart", response.data);

        return response.data;

    }
    catch {
        console.log("Error");
    }
})
export const addCart = createAsyncThunk("cart/addToCart", async ({ userId, product }, thunkApi) => {
    try {
        // console.log("??????????????????????????????????");
        const response = await axios.post(`http://localhost:4000/user/addProductToCart/${userId}`, product)
        return response.data;
    }
    catch (error) {
        return thunkApi.rejectWithValue(error.response?.data || "שגיאה לא ידועה")
    }

})

export const deleteFromCart=createAsyncThunk("cart/delToCart",async ({userId,productId},thunkApi) => {
    try{
        // console.log("????????????????delete??????????????????");
        const response=await axios.delete(`http://localhost:4000/user/deleteProductFromCart/${userId}/${productId}`)
        return response.data;
    }
    catch(error){
        return thunkApi.rejectWithValue(error.response?.data || "שגיאה לא ידועה")
    }
})
export const deleteOrder=createAsyncThunk("deleteOrder/order",async ({userId,productId},thunkApi) => {
    try{
        // console.log("????????????????delete??????????????????");
        const response=await axios.delete(`http://localhost:4000/order/${userId}/${productId}`)
        return response.data;
    }
    catch(error){
        return thunkApi.rejectWithValue(error.response?.data || "שגיאה לא ידועה")
    }
    
})




export const CartOrderSlice = createSlice({

    name: 'orders',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(del1productFromCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                // const updateUser=action.payload
                state.cart = action.payload
            })
            .addCase(getListOrder.fulfilled, (state, action) => {
                state.listOrders = action.payload;
                console.log("Updated Orders from server:", action.payload);
            })
            .addCase(getCartById.fulfilled, (state, action) => {
                console.log("cart id line 176 : ", action.payload)
                state.cart = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(deleteCartUser.fulfilled, (state, action) => {
                console.log("cart id line 176 : ", action.payload)
                state.cart = action.payload
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                // const updateUser=action.payload
                // state.cart=updateUser.cart || []
                state.cart = action.payload
            })
             .addCase(deleteFromCart.fulfilled,(state,action)=>{
                state.status="succeeded";
                // const updateUser=action.payload
                // state.cart=state.cart.filter(p=>p.id===action.payload)
                state.cart=action.payload
                // console.log(state.cart)
           })
            .addCase(deleteOrder.fulfilled,(state,action)=>{
                state.status="succeeded";
                // const updateUser=action.payload
                // state.cart=state.cart.filter(p=>p.id===action.payload)
                // state.cart=action.payload
                // console.log(state.cart)
           })
    }
});


export const { setCart } = CartOrderSlice.actions;
export default CartOrderSlice.reducer