import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Api/Api";
import axios from "axios";



export const getAllBrands= createAsyncThunk('brand/getAllBrands',
    async(_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.getAllBrands)
            
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    })

const brandSlice =createSlice({
    name:"brand",
    initialState:{
        brands:[],
        loading:false,
       error:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBrands.pending,(state)=>{
            state.loading =true
        })
        .addCase(getAllBrands.fulfilled,(state,action)=>{
            state.brands= action.payload
            state.loading =false
            state.error= false
        })
        .addCase(getAllBrands.rejected,(state,action)=>{
            state.error = action.payload
        })

    }
})
export default brandSlice.reducer