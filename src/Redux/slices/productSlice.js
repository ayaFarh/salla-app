import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Api/Api";
import axios from "axios";



export const getAllProducts = createAsyncThunk(
    'product/getAllProduct',
    async ({ page = 1}, thunkAPI) => {
      try {
        const { data } = await axios.get(`${API.getAllproducts}`, {
          params: { page, limit: 12 }
        });
        return data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data );
      }
    }
  );
  
  

const productSlice =createSlice({
    name:"products",
    initialState:{
        products:[],
        loading:false,
       error:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.loading =true
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.products= action.payload
            state.loading =false
            state.error= false
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.error = action.payload
        })

    }
})
export default productSlice.reducer