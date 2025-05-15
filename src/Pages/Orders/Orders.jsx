import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrdersItems from './component/OrdersItems'
import EmptySec from './component/EmptySec'
import LoadingCar from '../../Component/LoadingCar'
import { jwtDecode } from 'jwt-decode'
import { GetUserOrders } from '../../Redux/slices/orders'
import Cookies from 'js-cookie'

export default function Orders() {
  const {orders,loading}=useSelector((state)=>state.orders)
   
     console.log(orders);
  const dispatch =useDispatch()
 useEffect(()=>{
      const token = Cookies.get('token');
     const { id } = jwtDecode(token)
      dispatch(GetUserOrders(id))

    },[dispatch])
   
  return (
    <div className='container space-y-4'>
     {loading ? (
  <LoadingCar />
) : orders && orders.length > 0 ? (
  <OrdersItems />
) : (
  <EmptySec />
)}

    </div>
  )
}
