import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Api/Api";
import axios from "axios";
import { showtoast } from "../../uitiliets/ShowToast";
import Cookies from 'js-cookie';

export const handelGetUserCart = createAsyncThunk(
    'cart/handelGetUserCart',
    async (_, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url: API.Cart,
                method: "GET",
                headers:{
                    token,
                }
            }
            const { data } = await axios.request(options);
            console.log(data);
            
            return data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);


export const handelAddToCart = createAsyncThunk(
    'cart/handelAddToCart',
    async (id, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url: API.Cart,
                method: "POST",
                headers:{
                    token,
                },
                data:{
                    productId: id
                }
            }
            const { data } = await axios.request(options);
            showtoast('success', 'Product added to cart successfully');
            console.log(data);
            
            return data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const handelAllDeletCart = createAsyncThunk(
    'cart/handelAllDeletCart',
    async (id, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }
        try {
            let options = {
                url: API.Cart,
                method: "DELETE",
                headers:{
                    token,
                },
               
            }
            const { data } = await axios.request(options);
            showtoast('success', 'All products deleted from cart successfully');
            console.log(data);
            
            return data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

export const deleteSpacialProductCart = createAsyncThunk(
    'cart/deleteSpacialProductCart',
    async (id, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url: `${API.Cart}/${id}`,
                method: "DELETE",
                headers:{
                    token,
                },
            }
            const { data } = await axios.request(options);
            showtoast('success', 'Product deleted from cart successfully');
            console.log(data);
            
            return data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);


export const handelUpdateCart = createAsyncThunk(
    'cart/handelUpdateCart',
    async ({id, count, thunkAPI}) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url: `${API.Cart}/${id}`,
                method: "PUT",
                headers:{
                    token,
                },
                data:{
                    count,
                }
            }
            const { data } = await axios.request(options);
            showtoast('success', 'cart updated successfully');
            console.log(data);
            
            return data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);




const cartSlice= createSlice({
    name:"cart",
    initialState:{
        cart:[],
        CountOfCart: Cookies.get('cartCount') ? parseInt(Cookies.get('cartCount')) : 0,
        loading:false,
       error:false
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(handelGetUserCart.pending,(state)=>{
            state.loading =true
        })
        .addCase(handelGetUserCart.fulfilled,(state,action)=>{
            state.cart= action.payload
            state.loading =false
            state.error= false
        })
        .addCase(handelGetUserCart.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(handelAddToCart.pending,(state)=>{
            state.loading =true
        })
        .addCase(handelAddToCart.fulfilled,(state,action)=>{
            state.cart= action.payload  
            Cookies.set('cartCount', action.payload.numOfCartItems)
            state.loading =false
            state.error= false
        })
        .addCase(handelAddToCart.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(handelAllDeletCart.pending,(state)=>{
            state.loading =true
        })
        .addCase(handelAllDeletCart.fulfilled,(state,action)=>{
            state.cart = action.payload
            state.loading =false
            state.error= false
        })
        .addCase(handelAllDeletCart.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(deleteSpacialProductCart.pending,(state)=>{
            state.loading =false
        })
        .addCase(deleteSpacialProductCart.fulfilled,(state,action)=>{
            state.cart= action.payload
            state.loading =false
            state.error= false
        })
        .addCase(deleteSpacialProductCart.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(handelUpdateCart.pending,(state)=>{
            state.loading =false
        })
        .addCase(handelUpdateCart.fulfilled,(state,action)=>{
            state.cart= action.payload
            state.loading =false
            state.error= false
        })
        .addCase(handelUpdateCart.rejected,(state,action)=>{
            state.error = action.payload
        })
    }

})

export default cartSlice.reducer