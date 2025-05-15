import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import productReducer from "./slices/productSlice";
import brandsReducer from "./slices/brandSlice"
import categoriesReducer from "./slices/categorySlice"
import cartReducer from "./slices/cartSlice"
import wishlistReducer from "./slices/wishlistSlice"
import orderReducer from "./slices/orders"
import shippingAdreesReducer from "./slices/shippingAdrees"
import subcategory from "./slices/subcategorySlice"


export const store =configureStore({
   reducer:{
    auth: authReducer,
    product:productReducer,
    brands:brandsReducer,
    categories:categoriesReducer,
    cart:cartReducer,
    wishlist:wishlistReducer,
    orders:orderReducer,
    shipingAdrees:shippingAdreesReducer,
    subcategory
   }
})