import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import WishlistItems from './WishlistItems';
import EmptySec from './EmptySec';
import { GetUserWishlist } from '../../Redux/slices/wishlistSlice';
import LoadingAnimation from '../../Component/LoadingAnimation';

export default function Wishlist() {
    const {loading, wishlist} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch()
   
    
    useEffect(() => {
       dispatch(GetUserWishlist())
    }, [dispatch]);
  return (
    <div className=''>
   {loading ?(<LoadingAnimation/>)
   : wishlist && wishlist?.length > 0  ?(<WishlistItems/>):(wishlist?.length === 0 && <EmptySec/>)}

    </div>
  )
}
