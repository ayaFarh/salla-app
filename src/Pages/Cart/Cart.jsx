import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItems from './Component/CartItems';
import ImptySec from './Component/ImptySec';
import ShippingAdrees from '../ShappingAdrees/ShippingAdrees';
import { handelGetUserCart } from '../../Redux/slices/cartSlice';
import LoadingAnimation from '../../Component/LoadingAnimation';

export default function Cart() {
    const {loading ,cart} = useSelector((state) => state.cart);
    const dispatch =useDispatch()
    useEffect(()=>{
      dispatch(handelGetUserCart())
    },[dispatch])
  return (
    <div className='container space-y-4'>
    <div className='bg-slate-100 py-4 rounded space-y-4'>
       {loading ?(<LoadingAnimation/>)
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
