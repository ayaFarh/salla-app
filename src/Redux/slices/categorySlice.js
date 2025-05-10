import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Api/Api";
import axios from "axios";



export const getAllcategory= createAsyncThunk('category/getAllBrands',
    async(_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.categories)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    })

const categorySlice =createSlice({
    name:"category",
    initialState:{
        categories:[],
        loading:false,
       error:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllcategory.pending,(state)=>{
            state.loading =true
        })
        .addCase(getAllcategory.fulfilled,(state,action)=>{
            state.categories= action.payload
            state.loading =false
            state.error= false
        })
        .addCase(getAllcategory.rejected,(state,action)=>{
            state.error = action.payload
        })

    }
})
export default categorySlice.reducer