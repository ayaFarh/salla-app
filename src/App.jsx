import './App.css'
// import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Layout from './Component/Layout'
import Notfound from './Pages/Notfound'
import Login from './Auth/Login/Login'

import { Provider } from 'react-redux'
import { store } from './Redux/store'
import { Toaster } from 'react-hot-toast'
import ForgetPass from './Auth/ForgetPaa.jsx/ForgetPass'
import VerifyCode from './Auth/VerifyCode/VerifyCode'
import ResetPassWors from './Auth/ResetPassword/ResetPassWord'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Products from './Pages/Products/Products'
import Brand from './Pages/Brands/Brand'
import Cart from './Pages/Cart/Cart'
import Wishlist from './Pages/Wishlist/Wishlist'
import Orders from './Pages/Orders/Orders'
import Signup from './Auth/Signeup/Signup'
import ScrollToTop from './ScrolTop'


function App() {
  const route = createBrowserRouter([
    {path: "/",
      element: <Layout/>,
      children: [
        {path:"/",element:<Home/>},
        {path:`/productDetails/:title`,element:<ProductDetails/>},
        {path:"/products",element:<Products/>},
        {path:"/brands",element:<Brand/>},
        {path:"cart",element:<Cart/>},
        {path:"wishlist",element:<Wishlist/>},
        {path:"allOrders",element:<Orders/>},
        {path: "*",element:<Notfound/>}
      ]},
      {path:'/Auth/login',element:<Login/>},
      {path:'/Auth/signup',element:<Signup/>},
      {path:'/Auth/forgetpassword',element:<ForgetPass/>},
      {path:'/Auth/VerifyCode',element:<VerifyCode/>},
      {path:'/Auth/resetpasswors',element:<ResetPassWors/>},
])

  return (
    <>
    <Provider store={store} >
      <Toaster/>
      
    
      <RouterProvider router={route} />
      </Provider>

    </>
  )
}

export default App
