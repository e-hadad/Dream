import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status:null,
    // admin:'',
    listOrders:[],
    listUsers:[],
}

export const getListOrder = createAsyncThunk("orders",async()=>{
    try{
        const response = await axios.get("http://localhost:4000/order");
        // const response = await axios.get("https://fakestoreapi.com/products");
        // const response A= await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response.data);
        return response.data;
    }
    catch{
        console.log("Error");
    }
})

export const getListUser = createAsyncThunk("users",async()=>{
    try{
        const response = await axios.get("http://localhost:4000/user");
        // const response = await axios.get("https://fakestoreapi.com/products");
        // const response A= await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response.data);
        return response.data;
    }
    catch{
        console.log("Error");
    }
})

export const UsersOrderSlice = createSlice({
    
    name: 'Order',
    initialState,
    reducers: {},
   extraReducers: (builder) => {
    builder
        .addCase(getListOrder.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.listOrders = action.payload;
        })
        .addCase(getListOrder.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getListOrder.rejected, (state) => {
            state.status = 'failed';
        })
        .addCase(getListUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.listUsers = action.payload;
        })
        .addCase(getListUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getListUser.rejected, (state) => {
            state.status = 'failed';
        });
}

});





// export const { setAdmin } = UsersOrderSlice.actions;
export default UsersOrderSlice.reducer