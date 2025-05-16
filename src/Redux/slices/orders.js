import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Api/Api";
import axios from "axios";
import Cookies from 'js-cookie';

export const GetUserOrders= createAsyncThunk(
    'Orders/GetUserOrders',
    async (id, thunkAPI) => {
        const token = Cookies.get('token');
        if (!token) {
           
            return thunkAPI.rejectWithValue({ message: 'Not authenticated' });
        }

        try {
            let options = {
                url:    `${API.getUserOrders}/${id}`,
                method: "GET",
                headers:{
                    token,
                }
            }
            const { data } = await axios.request(options);
            console.log(data);
            
            return data;
        } catch (err) {
            
            return thunkAPI.rejectWithValue(err.response?.data);
        }
    }
);

const orderSlice= createSlice({
    name:'order',
    initialState:{
        orders:[],
        loading:false,
        error:false
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(GetUserOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(GetUserOrders.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(GetUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = false;
            
        })

    }

})
export default orderSlice.reducer