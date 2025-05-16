import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrdersItems from './component/OrdersItems'
import EmptySec from './component/EmptySec'
import { jwtDecode } from 'jwt-decode'
import { GetUserOrders } from '../../Redux/slices/orders'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import LoadingAnimation from '../../Component/LoadingAnimation'

export default function Orders() {
  const {orders,loading}=useSelector((state)=>state.orders)
   
     console.log(orders);
  const dispatch =useDispatch()
   const token = Cookies.get('token');
 useEffect(()=>{
     
    if(token){
        const {id}=jwtDecode(token)
        dispatch(GetUserOrders(id))
    }

    },[dispatch,token])
   
  return (
    <div className='container space-y-4'>
     {loading ? (
  <LoadingAnimation />
) : orders  && orders.length > 0 ? (
  <OrdersItems />
):
token && Orders.length === 0 ?  <EmptySec /> : (
  <div className='flex flex-col space-y-4 items-center justify-center min-h-[300px]'>
         <p> please log in first and make order </p>
         <Link to={'/login'} className='btn-primary'>log in</Link>
        </div>
)}

    </div>
  )
}
