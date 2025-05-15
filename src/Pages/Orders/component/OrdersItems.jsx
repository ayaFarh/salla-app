import React from 'react'
import {  useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import Skeleton from 'react-loading-skeleton'


export default function OrdersItems() {
    const{orders}=useSelector((state)=>state.orders)
    console.log(orders);
    
    
  return (
    <div className=''>
      {orders && orders.length > 0 ? orders.map((order) => (
        <div className='border-2 border-gray-200 p-2 rounded space-y-1'>
      <div className='min-[557px]:flex items-center   justify-between my-4'>
          <p className=''>Tottal Price : <span className='text-slate-500'>{order.totalOrderPrice} LE</span></p>
          <div className='flex gap-2 max-[557px]:my-4'>
           <div className='text-white'>{order.isPaid ? <span className='bg-green-200 py-2 px-6'>Paid</span> : <span className='bg-red-300 py-2 px-6 rounded-full'>Not Paid</span>}</div>
          <div className='text-white'>{order.isDelivered ? <span className='bg-green-200 py-2 px-6'>Delivered</span> : <span className='bg-blue-500 py-2 px-6 text-white p-2 rounded-full'>in progress</span>}</div>
          </div>   
      </div>
      <p>Order ID : {order._id}</p>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 '>
        {order.cartItems.map((item) => (
       <div className='p-2 rounded border border-gray-200'>
        <img src={item.product.imageCover} alt={item.product.title} className='' loader={<Skeleton className='w-24 h-24 bg-slate-500'/>}/>
          <h2 className='text-slate-500 line-clamp-1'>{item.product.title}</h2>
          <p>{item.price} L.E</p>
       </div>
       ))}
       
      </div>
        </div>

      )):""}
    </div>
  )
}
