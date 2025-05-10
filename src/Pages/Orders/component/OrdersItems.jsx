import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserOrders } from '../../../Redux/slices/orders'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import Orders from '../Orders'


export default function OrdersItems() {
    const{orders}=useSelector((state)=>state.orders)
    console.log(orders);
    const token = Cookies.get('token');
    const {id} = jwtDecode(token)
    const dispatch =useDispatch()
    useEffect(()=>{
      dispatch(GetUserOrders(id))
    },[dispatch,id])
  return (
    <div>
      {orders && orders.length > 0 ? orders.map((order) => (
       <div>
        <img src={order.cartItems.product.imageCover} alt={order.cartItems.product.title} />
       </div>

      )):""}
    </div>
  )
}
