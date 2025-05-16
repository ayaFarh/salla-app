import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export const creatOnlinePayment = createAsyncThunk(
    "shippingAdrees/creatOnlinePayment",
    async ({values,id, thunkAPI}) => {
            try {
                let options = {
                    url:`${API.onlinePayMent}/${id}?url=http://localhost:3000`,
                    method: "POST",
                    headers:{
                        token,
                    },
                    data:{
                        values,
                         }
                }
                const { data } = await axios.request(options);
                console.log(data.data);
                if(data.status === "success"){
                    window.location.href = data.session.url
                }
                
                return data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data );
        }

    }
    
)

export const cashPayment = createAsyncThunk(
    "shippingAdrees/cashPayment",
    async ({values,id, thunkAPI}) => {
 
            try {
                let options = {
                    url:`${API.cashPayMent}/${id}`,
                    method: "POST",
                    headers:{
                        token,
                    },
                    data:{
                        values,
                         }
                }
                const { data } = await axios.request(options);
                console.log(data.data);
                if(data.status === "success"){
                    window.location.href = data.session.url
                }
                
                return data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data );
        }

    }
    
)



const shippingAdreesSlice = createSlice({
    name: "shippingAdrees",
    initialState: {
        shippingAdrees: [],
        loading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(creatOnlinePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(creatOnlinePayment.fulfilled, (state, action) => {
                state.shippingAdrees = action.payload;
                state.loading = false;
                state.error = false;
            })
            .addCase(creatOnlinePayment.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(cashPayment.pending,(state)=>{
                state.loading=true
            })
            .addCase(cashPayment.fulfilled,(state,action)=>{
                state.shippingAdrees=action.payload
                state.loading =false
                state.error = false
            })
            .addCase(cashPayment.rejected,(state,action)=>{
                state.error = action.payload

            })
    },
});

export default shippingAdreesSlice.reducer;