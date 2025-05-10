import React from 'react'
import { useSelector } from 'react-redux'
import OrdersItems from './component/OrdersItems'

export default function Orders() {
  const {orders}=useSelector((state)=>state.orders)
  
  return (
    <div>
      {orders? <OrdersItems/>:""}
    </div>
  )
}
