import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: null,
    listProduct: [],
    listCart: [],
}
export const getListProduct = createAsyncThunk("products", async () => {
    try {
        const response = await axios.get("http://localhost:4000/product");
        console.log(response.data);
        return response.data;
    }
    catch {
        console.log("Error");
    }
})
export const deleteProduct = createAsyncThunk("deleteProduct", async (id, thunkApi) => {
    try {
        const response = await axios.delete(`http://localhost:4000/product/${id}`);
        console.log(response);
        return { id };
    }
    catch {
        console.log("Error");
    }
})
export const addProduct = createAsyncThunk("addProduct", async (product) => {
    try {
        const response = await axios.post("http://localhost:4000/product", product);
        console.log(response.data);
        return response.data;
    }
    catch {
        console.log("Error");
    }
})
export const UpdateProduct = createAsyncThunk("UpdateProduct", async (product) => {
    try {
        const response = await axios.put(`http://localhost:4000/product/${product.id}`, product);
        console.log(response.data);
        return product;
    }
    catch {
        console.log("Error");
    }
})


// export const addCart=createAsyncThunk("cart/addToCart",async ({userId,product},thunkApi) => {
//     try{
//         console.log("??????????????????????????????????");
//         const response=await axios.post(`http://localhost:4000/user/addProductToCart/${userId}`,product)
//         return response.data;
//     }
//     catch(error){
//         return thunkApi.rejectWithValue(error.response?.data || "שגיאה לא ידועה")
//     }

// })
// export const deleteFromCart=createAsyncThunk("cart/delToCart",async ({userId,productId},thunkApi) => {
//     try{
//         console.log("????????????????delete??????????????????");
//         const response=await axios.delete(`http://localhost:4000/user/deleteProductFromCart/${userId}/${productId}`)
//         return response.data;
//     }
//     catch(error){
//         return thunkApi.rejectWithValue(error.response?.data || "שגיאה לא ידועה")
//     }

// })
export const productSlice = createSlice({

    name: 'products',
    initialState,
    reducers: {
        setListProduct: (state, action) => {
            state.listProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listProduct = action.payload;
                console.log("product slice", action.payload);
                // console.log("Success");
            })
            .addCase(getListProduct.pending, (state, action) => {
                state.status = 'loading';
                // console.log("Loading");
            })
            .addCase(getListProduct.rejected, (state) => {
                state.status = 'failed';
                // console.log("Failed");
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload);
                state.listProduct = state.listProduct.filter((p) => p.id !== action.payload.id);
            }).addCase(deleteProduct.pending, (state, action) => {
                state.status = 'loading';
                // console.log("Loading");
            }).addCase(deleteProduct.rejected, (state) => {
                state.status = 'failed';
                // console.log("Failed");
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listProduct.push(action.payload);
                console.log(action.payload);
                // console.log("Success");
            })
            .addCase(UpdateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listProduct = state.listProduct.map((p) => p.id === action.payload.id ? action.payload : p);
                console.log(action.payload);
                // console.log("Success");
            })


    }

}
);

export const { setListProduct } = productSlice.actions;
export default productSlice.reducer