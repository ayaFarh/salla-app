import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrdersItems from './component/OrdersItems'
import EmptySec from './component/EmptySec'
import { jwtDecode } from 'jwt-decode'
import { GetUserOrders } from '../../Redux/slices/orders'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import LoadingAnimation from '../../Component/LoadingAnimation'
import UnUthSection from '../../Component/UnUthSection'

export default function Orders() {
  const {orders,loading}=useSelector((state)=>state.orders)
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
    <UnUthSection/>
)}

    </div>
  )
}
