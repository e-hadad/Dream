import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status:null,
    admin:'',
    listUsers:[],
    idAdmin : 0
}

export const getListUser = createAsyncThunk("Users",async()=>{
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
export const addUser = createAsyncThunk("addUser",async(user)=>{
    try{
        const response = await axios.post("http://localhost:4000/user",user);
        // const response = await axios.get("https://fakestoreapi.com/products");
        // const response A= await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(response.data);
        return response.data;
    }
    catch{
        console.log("Error");
    }
})


export const LoginSlice = createSlice({
    
    name: 'login',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },
        setIdAdmin: (state, action) => {
            state.idAdmin = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.listUsers = action.payload;
                console.log(action.payload);
                // console.log("Success");
            })
            .addCase(getListUser.pending, (state,action) => {
                state.status = 'loading';
                // console.log("Loading");
            })
            .addCase(getListUser.rejected, (state) => {
                state.status = 'failed';
                // console.log("Failed");
            }).addCase(addUser.fulfilled, (state, action) => {  
                state.status = 'succeeded';
                state.listUsers.push(action.payload);
                // state.listUsers = action.payload.data;
                console.log(action.payload);
                // console.log("Success");
            })
            .addCase(addUser.pending, (state,action) => {
                state.status = 'loading';
                // console.log("Loading");
            })
    },
});



export const { setAdmin, setIdAdmin } = LoginSlice.actions;
export default LoginSlice.reducer