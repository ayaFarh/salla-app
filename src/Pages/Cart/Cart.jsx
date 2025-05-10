import React from 'react'
import { useSelector } from 'react-redux';
import CartItems from './Component/CartItems';
import LoadingCar from '../../Component/LoadingCar';
import ImptySec from './Component/ImptySec';
import ShippingAdrees from '../ShappingAdrees/ShippingAdrees';

export default function Cart() {
    const {loading ,cart} = useSelector((state) => state.cart);
  return (
    <div className='container space-y-4'>
    <div className='bg-slate-100 py-4 rounded space-y-4'>
       {loading ?(<LoadingCar/>)
       :cart?.data?.products?.length > 0 ?(

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <CartItems/>
          <ShippingAdrees/>
        </div>
       ):(<ImptySec/>)}
       
    </div>



</div>

  )
}
