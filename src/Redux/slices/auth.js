import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Api/Api";
import axios from "axios";
import { showtoast } from "../../uitiliets/ShowToast";
import Cookies from 'js-cookie';

export const handelSignup= createAsyncThunk('auth/handelSignup',
    async(values,{rejectWithValue})=>{
        try{
            const {data} = await axios.post(API.register,{
                name:values.name,
                email:values.email,
                phone:values.phone,
                password:values.password,
                rePassword:values.rePassword
            })
            showtoast('success','account created successfully')
            return data
        }catch(err){
            showtoast('error',err.response.data.message)
            return rejectWithValue(err.response.data)
        }
    })


export const handelLogin =createAsyncThunk('auth/handelLogin',
    async(values,{rejectWithValue})=>{
        try{
            const {data} = await axios.post(API.login,{
                email:values.email,
                password:values.password})
                showtoast('success','user loged in successfully')
                Cookies.set('token', data.token, { expires: 7, path: '/' });
                return data
        }catch(err){
            showtoast('error',err.response.data.message)
            return rejectWithValue(err.response.data)
        }
    })
    

    export const handelForgetPass =createAsyncThunk('auth/handelForgetPass',
        async(values,{rejectWithValue})=>{
            try{
                const {data} = await axios.post(API.forgetpass,{
                    email:values.email,})
                    showtoast('success','code sent successfully')
                    return data
            }catch(err){
                showtoast('error',err.response.data.message)
                return rejectWithValue(err.response.data)
            }
        })

        export const handelVerifyCode =createAsyncThunk('auth/handelVerifyCode',
            async(values,{rejectWithValue})=>{
                try{
                    const {data} = await axios.post(API.verifyCode,{
                        resetCode:values.resetCode,})
                        showtoast('success','code verified successfully')
                        return data
                }catch(err){
                    showtoast('error',err.response.data.message)
                    return rejectWithValue(err.response.data)
                }
            })

            export const handelResetPass =createAsyncThunk('auth/handelResetPass',
                async(values,{rejectWithValue})=>{
                    try{
                        const {data} = await axios.put(API.resetpassword,{
                            email:values.email,
                            newPassword:values.password})
                            showtoast('success','password reset successfully')
                            return data
                    }catch(err){
                        showtoast('error',err.response.data.message)
                        return rejectWithValue(err.response.data)
                    }
                })


                const userFromCookie = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

                export const authSlice = createSlice({
                    name: "auth",
                    initialState: {
                        user: userFromCookie,
                        isAuthenticated: !!userFromCookie,
                        loading: false,
                        error: null
                    },
                    reducers: {
                        logout: (state) => {
                            state.user = null;
                            state.isAuthenticated = false;
                            Cookies.remove("user");
                            Cookies.remove("token");
                            showtoast('success','user logged out successfully');
                        }
                    },
                    extraReducers: (builder) => {
                        builder
                        .addCase(handelSignup.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(handelSignup.fulfilled, (state, action) => {
                            state.user = action.payload.user;
                            state.isAuthenticated = true;
                            state.loading = false;
                            Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7 });
                        })
                        .addCase(handelSignup.rejected, (state, action) => {
                            state.error = action.payload;
                            state.loading = false;
                        })
                
                        .addCase(handelLogin.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(handelLogin.fulfilled, (state, action) => {
                            state.user = action.payload.user;
                            state.isAuthenticated = true;
                            state.loading = false;
                            Cookies.set('user', JSON.stringify(action.payload.user), { expires: 7 });
                            Cookies.set('token', action.payload.token, { expires: 7 });
                        })
                        .addCase(handelLogin.rejected, (state, action) => {
                            state.error = action.payload;
                            state.loading = false;
                        })
                
                     
                        .addCase(handelForgetPass.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(handelForgetPass.fulfilled, (state) => {
                            state.loading = false;
                        })
                        .addCase(handelForgetPass.rejected, (state, action) => {
                            state.error = action.payload;
                            state.loading = false;
                        })
                
                        .addCase(handelVerifyCode.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(handelVerifyCode.fulfilled, (state) => {
                            state.loading = false;
                        })
                        .addCase(handelVerifyCode.rejected, (state, action) => {
                            state.error = action.payload;
                            state.loading = false;
                        })
                
                        .addCase(handelResetPass.pending, (state) => {
                            state.loading = true;
                        })
                        .addCase(handelResetPass.fulfilled, (state) => {
                            state.loading = false;
                        })
                        .addCase(handelResetPass.rejected, (state, action) => {
                            state.error = action.payload;
                            state.loading = false;
                        });
                    }
                });
                
export const {logout} = authSlice.actions
export default authSlice.reducer