import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'
import { API } from "../../Api/Api";
import { showtoast } from "../../uitiliets/ShowToast";
import axios from "axios";



export const GetUserWishlist= createAsyncThunk(
    'wishlist/GetUserWishlist',
    async (_, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url: API.wishlist,
                method: "GET",
                headers:{
                    token,
                }
            }
            const { data } = await axios.request(options);
            console.log(data.data);
            
            return data.data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);


export const AddToWishlist = createAsyncThunk(
    'wishlist/AddToWishlist',
    async (id, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url: API.wishlist,
                method: "POST",
                headers:{
                    token,
                },
                data:{
                    productId: id
                }
            }
            const { data } = await axios.request(options);
            showtoast('success', 'Product added to wishlist successfully');
            console.log(data.data);
            
            return data.data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);



export const deleteFromWishlist = createAsyncThunk(
    'wishlist/deleteFromWishlist',
    async (id, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
            showtoast('error', 'You must be logged in to add items to the cart');
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url: `${API.wishlist}/${id}`,
                method: "DELETE",
                headers:{
                    token,
                },
            }
            const { data } = await axios.request(options);
            showtoast('success', 'Product deleted from wishlist successfully');
            console.log(data);
            
            return data;
        } catch (err) {
            showtoast('error', err.response?.data?.message || 'Something went wrong');
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);



const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[],
        wishlistCount:Cookies.get('wishlistCount') ? JSON.parse(Cookies.get('wishlistCount')) : 0,
        loading:false,
        error:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(GetUserWishlist.pending,(state)=>{
            state.loading =true
        })
        .addCase(GetUserWishlist.fulfilled,(state,action)=>{
            state.wishlist= action.payload
            state.wishlistCount= state.wishlist.length
            Cookies.set('wishlistCount', state.wishlist.length)
            state.loading =false
            state.error= false
        })
        .addCase(GetUserWishlist.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(AddToWishlist.pending,(state)=>{
            state.loading =true
        })
        .addCase(AddToWishlist.fulfilled,(state,action)=>{
            state.wishlist= action.payload
            state.wishlistCount= state.wishlist.length
            Cookies.set('wishlistCount', JSON.stringify(state.wishlistCount))
            state.loading =false
            state.error= false
        })
        .addCase(AddToWishlist.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(deleteFromWishlist.pending,(state)=>{
            state.loading =false
        })
        .addCase(deleteFromWishlist.fulfilled,(state,action)=>{
            state.wishlist = state.wishlist.filter(item => item.id !== action.meta.arg)
            state.wishlistCount= state.wishlist.length
            Cookies.set('wishlistCount', JSON.stringify(state.wishlistCount))
            state.loading =false
            state.error= false
        })
        .addCase(deleteFromWishlist.rejected,(state,action)=>{
            state.error = action.payload
        })
    }
})

export default wishlistSlice.reducer