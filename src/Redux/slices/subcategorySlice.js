import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API, BASE_URL } from "../../Api/Api";



export const getAllSubcategory= createAsyncThunk('subcategory/getAllSubcategory',
    async(_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(API.getAllSubcategory)
            return data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    })

export const handelSpacialSubcategoryToCat= createAsyncThunk('subcategory/handelSpacialSubcategoryToCat',
    async({id,isDropdown=false,limit}, { rejectWithValue }) => {
       
        try {
            const { data } = await axios.get(`${BASE_URL}/categories/${id}/subcategories?limit=${limit}`)
            // return data.data
            return  {id,data:data.data,isDropdown}
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    })



const subcategory = createSlice({
    name:"subcategory",
    initialState:{
        subcategories:[],
        products:[],
        subcategoriesByCatId: {},
        DropDowensubcategoriesByCatId: {},
        loading:false,
       error:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllSubcategory.pending,(state)=>{
            state.loading =true
        })
        .addCase(getAllSubcategory.fulfilled,(state,action)=>{
            state.subcategories= action.payload
            state.loading =false
            state.error= false
        })
        .addCase(getAllSubcategory.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(handelSpacialSubcategoryToCat.pending,(state)=>{
            state.loading =true
        })
        .addCase(handelSpacialSubcategoryToCat.fulfilled,(state,action)=>{
            // const catId =action.meta.arg.id
            // state.subcategoriesByCatId[catId] = action.payload.data
             const { id, data, isDropdown } = action.payload;
            if (isDropdown) {
                state.DropDowensubcategoriesByCatId[id] = data;
            }else {
           state.subcategoriesByCatId[id] =data
           } 
            state.loading =false
            state.error= false
        })
        .addCase(handelSpacialSubcategoryToCat.rejected,(state,action)=>{
            state.error = action.payload
        })

    }
})

export default subcategory.reducer