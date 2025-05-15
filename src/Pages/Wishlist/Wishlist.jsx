import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import WishlistItems from './WishlistItems';
import EmptySec from './EmptySec';
import { GetUserWishlist } from '../../Redux/slices/wishlistSlice';
import LoadingCar from '../../Component/LoadingCar';

export default function Wishlist() {
    const {loading, wishlist} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(GetUserWishlist())

    }, [dispatch]);
  return (
    <div className=''>
   {loading ?(<LoadingCar/>)
   : wishlist && wishlist?.length > 0  ?(<WishlistItems/>):(<EmptySec/>)}

    </div>
  )
}
